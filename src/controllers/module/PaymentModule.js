import Module from './Module';
import FileRequirement from '../fileRequirement/FileRequirement';
import ModuleObject from '../../models/moduleObject.model';
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
  constructor(eventId_) {
    super(eventId_, 'Pagamento', 'payment');
  }

  initialize() {
    const receipt = new FileRequirement();
    receipt.setData(
      'Comprovante de pagamento',
      'Comprovante de pagamento do boleto de inscrição no evento',
      'receipt',
      '.pdf .png .jpeg .jpg',
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

  /**
   * Retrieves the user data from database (receipts) with a flag that defines
   * if the user payment was approved
   * @param userId User's identification
   */
  getUserInfo(userId) {
    const receiptsObjects = this.moduleObject.ofObjects.filter(
      receipt => receipt.data.user.equals(userId));

    const approved = receiptsObjects.reduce((final, current) => final || current.data.status === 'approved', false);

    return ({
      approved,
      receipts: receiptsObjects,
    });
  }

  /**
   * Retrieves payments that are waiting for approvements (with the state 'to_approve')
   */
  getToApprovePayments() {
    const toApprovePayments = this.moduleObject.ofObjects.filter(
      receipt => receipt.data.status === 'to_approve');

    return new Promise((resolve, reject) => {
      ModuleObject.populate(toApprovePayments, [
        { path: 'data.user', select: 'name', model: 'User' },
        { path: 'data.file', model: 'File' }],
      (err, docs) => {
        if (err) reject();
        resolve(docs);
      });
    });
  }

  act(user, roles, body, entitySlug, subaction) {
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const permissions = context.permissions;
    const makePayment = permissions.find(perm => perm.action === 'make_payment');
    const approvePayment = permissions.find(perm => perm.action === 'approve_payment');

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
      default:
        // do nothing
    }

    return this;
  }
}

export default PaymentModule;
