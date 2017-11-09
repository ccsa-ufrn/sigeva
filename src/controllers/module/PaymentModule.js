import Module from './Module';

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
    this.setEntity('payment', 'Pagamento', {
      instructions: 'Instrução para efetuar pagamento',
    });
    this.setPermission('make_payment', 'Efetuar pagamento', 'payment');
    this.setPermission('approve_payment', 'Aprovar pagamento', 'payment');
  }
}

export default PaymentModule;
