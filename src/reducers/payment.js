import * as Action from '../actions/constants';

const initialMakePaymentState = {
  file: null,
  submiting_receipt: false,
  submiting_receipt_error: false,
};

const initialPaymentState = {
  makePayment: initialMakePaymentState,
};

const makePayment = (state = initialMakePaymentState, action) => {
  switch (action.state) {
    case Action.DOING_PAYMENT_RECEIPT_SUBMIT:
      return Object.assign({}, state, {
        submiting_receipt: true,
      });
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_SUCCESS:
      return Object.assign({}, state, {
        submiting_receipt: false,
        submiting_receipt_error: false,
      });
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_FAILURE:
      return Object.assign({}, state, {
        submiting_receipt: false,
        submiting_receipt_error: true,
      });
    default:
      return state;
  }
};

const payment = (state = initialPaymentState, action) => {
  switch (action.type) {
    case Action.DOING_PAYMENT_RECEIPT_SUBMIT:
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_SUCCESS:
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_FAILURE:
      return Object.assign({}, state, { makePayment: makePayment(state.makePayment, action) });
    default:
      return state;
  }
};

export default payment;
