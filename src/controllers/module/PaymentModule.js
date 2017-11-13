import Module from './Module';
import FileRequirement from '../fileRequirement/FileRequirement';

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

  act(user, roles, body, entitySlug, subaction) {
    const entity = this.getEntityBySlug(entitySlug);
    switch (subaction) {
      case 'submit_receipt':
        // recieve body.fileId and stores at objects
        break;
      default:
        // do nothing
    }

    return this;
  }
}

export default PaymentModule;
