import Module from './Module';
import FileRequirement from '../fileRequirement/FileRequirement';
import FieldRequest from '../fieldRequest/FieldRequest';
import ModuleObject from '../../models/moduleObject.model';
import ModuleModel from '../../models/module.model';
import PaymentReceipt from '../../models/paymentReceipt.model';

/** @@ Payment Module
 * Subclass of Module, that represents the Payment Module
 *
 * @ Log:
 * Maradona Morais '2017-11-04 19:20' >> First definition of the class
 */

class PaymentModule extends Module {
  /**
   * Initialize a Payment instance creating a empty Object
   */
  constructor(event) {
    super(event, 'Pagamento', 'payment');
  }

  initialize() {
    const receipt = new FileRequirement();
    receipt.setData(
      'Comprovante de pagamento',
      'Comprovante de pagamento do boleto de inscrição no evento',
      'receipt',
      '.pdf,.png,.jpeg,.jpg',
    );
    return new Promise((resolve, reject) => {
      receipt.store()
        .then((storedFileRequirement) => {
          this.setEntity('payment', 'Pagamento', {
            instructions: 'Instrução para efetuar pagamento',
            receiptFileRequirement: storedFileRequirement._id,
          });

          this.setPermission('make_payment', 'Efetuar pagamento', 'payment');
          this.setPermission('approve_payment', 'Aprovar pagamento', 'payment');
          this.store()
            .then(resolve)
            .catch(reject);
        }).catch(reject);
    });
  }

  // Stores the fileId for a receipt submission at objects field
  submitReceipt(userId, fileId) {
    const object = new ModuleObject({
      entity: 'payment',
      data: new PaymentReceipt({
        user: userId,
        file: fileId,
      }),
    });

    this.moduleObject.ofObjects.push(object);
    return this.store();
  }

  exemptPayment(userId) {
    const object = new ModuleObject({
      entity: 'payment',
      data: new PaymentReceipt({
        user: userId,
        type: 'free',
        status: 'approved',
      }),
    });

    this.moduleObject.ofObjects.push(object);
    return new Promise((resolve, reject) => {
      return this.store()
        .then(() => { resolve(); })
        .catch(() => { reject(); });
    });
  }

  /**
   * Retrieves the user data from database (receipts) with a flag that defines
   * if the user payment was approved
   * @param userId User's identification
   */
  getUserInfo(userId) {
    const receiptsObjects = this.moduleObject.ofObjects.filter(
      receipt => receipt.data.user.equals(userId));

    const approved = receiptsObjects.reduce((final, current) => final || current.data.status === 'approved' || current.data.type === 'free', false);

    return ({
      approved,
      receipts: receiptsObjects,
    });
  }

  /**
   * Retrieves payments that are waiting for approvements (with the state 'to_approve')
   */
  getToApprovePayments() {
    // Get 'to_approve' payments
    const toApprovePayments = this.moduleObject.ofObjects;

    return new Promise((resolve, reject) => {
      // Populate payments with user data and file data
      ModuleObject.populate(toApprovePayments, [
        { path: 'data.user', select: 'name ofFields', model: 'User' },
        { path: 'data.file', model: 'File' }],
      (err, docs) => {
        if (err) reject();

        ModuleObject.populate(docs, [
          { path: 'data.user.ofFields.request', model: 'FieldRequest' },
        ], (err_, docs_) => {
          if (err_) reject();

          const docsWithRoles = docs_.map((doc) => {
            const parsedDoc = new Object();
            parsedDoc.data = doc.data;
            parsedDoc._id = doc._id;
            parsedDoc.roles = this.event.getUserRelationships(String(doc.data.user._id).roles);

            return parsedDoc;
          });
          resolve(docsWithRoles);
        });
      });
    });
  }

  /**
   * Updates a receipt status ('to_approve' -> 'rejected'|'approved')
   * @param receiptId receipt id
   * @param newStatus new status
   */
  updateReceiptStatus(receiptId, newStatus) {
    // Doing it by a hard way, using mongoose operations
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': receiptId },
        {
          $set: {
            'ofObjects.$.data.status': newStatus,
          },
        }, (err, doc) => {
          if (err) reject(err);
          resolve(doc);
        });
    });
  }

  /**
   * Returns a list of user with free payment type
   */
  getExemptsList() {
    return new Promise((resolve, reject) => {
      const freeObjects = this.moduleObject.ofObjects.filter(obj => obj.data.type === 'free');
      ModuleModel.populate(freeObjects, [{
        path: 'data.user', select: 'name email', model: 'User',
      }], (err, docs) => {
        if (err) reject();
        resolve(docs);
      });
    });
  }

  /**
   * Runs a action performed by the user
   * @param user logged User instance
   * @param roles roles owned by the logged user
   * @param body request POST body
   * @param entitySlug entitty identification slug
   * @param subaction action that will be dispacthed
   */
  act(user, roles, body, entitySlug, subaction) {
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const permissions = context.permissions;
    const makePayment = permissions.find(perm => perm.action === 'make_payment');
    const approvePayment = permissions.find(perm => perm.action === 'approve_payment');
    const exemptPayment = permissions.find(perm => perm.action === 'exempt_payment');

    switch (subaction) {
      case 'submit_receipt':
        if (makePayment) {
          return new Promise((resolve, reject) => {
            if (body.fileId) {
              this.submitReceipt(user.userObject._id, body.fileId)
                .then(resolve({}))
                .catch(reject);
            } else {
              reject('File ID is required to submit receipt');
            }
          });
        }
        break;
      case 'get_info':
        if (makePayment) {
          return new Promise((resolve) => {
            resolve(this.getUserInfo(user.userObject._id));
          });
        }
        break;
      case 'get_to_approve_payments':
        if (approvePayment) {
          // getToApprovePayments already returns a Promise
          return this.getToApprovePayments();
        }
        break;
      case 'update_receipt_status':
        if (approvePayment) {
          return new Promise((resolve, reject) => {
            if (body.receiptId && body.newStatus) {
              this.updateReceiptStatus(body.receiptId, body.newStatus)
                .then(resolve(this.getToApprovePayments()))
                .catch(reject);
            } else {
              reject('Receipt ID or new status not defined');
            }
          });
        }
        break;
      case 'get_exempts_list':
        if (exemptPayment) {
          return this.getExemptsList();
        }
        break;
      case 'exempt_user':
        if (exemptPayment) {
          return this.exemptPayment(body.userId);
        }
        break;
      default:
        // do nothing
    }
    // TODO: this return statement is a stub, remove it
    return this;
  }
}

export default PaymentModule;
