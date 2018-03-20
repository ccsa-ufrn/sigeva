import * as Action from '../actions/constants';

const initialMakePaymentState = {
  file: null,
  file_submited: false,
  submiting_receipt: false,
  submiting_receipt_error: false,
};

const initialApprovePaymentState = {
  to_approve_payments: null,
};

const initialPaymentState = {
  makePayment: initialMakePaymentState,
  approvePayment: initialApprovePaymentState,
  exemptsList: [],
  approved: false,
  receipts: [],
};

const makePayment = (state = initialMakePaymentState, action) => {
  switch (action.state) {
    case Action.DOING_PAYMENT_RECEIPT_SUBMIT:
      return Object.assign({}, state, {
        submiting_receipt: true,
      });
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_SUCCESS:
      return Object.assign({}, state, {
        file_submited: true,
        submiting_receipt: false,
        submiting_receipt_error: false,
      });
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_FAILURE:
      return Object.assign({}, state, {
        submiting_receipt: false,
        submiting_receipt_error: true,
      });
    default: return state;
  }
};

const approvePayment = (state = initialApprovePaymentState, action) => {
  switch (action.type) {
    case Action.SET_TO_APPROVE_PAYMENT_DATA:
      return Object.assign({}, state, {
        to_approve_payments: action.data,
      });
    default: return state;
  }
};

const payment = (state = initialPaymentState, action) => {
  switch (action.type) {
    case Action.DOING_PAYMENT_RECEIPT_SUBMIT:
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_SUCCESS:
    case Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_FAILURE:
      return Object.assign({}, state, { makePayment: makePayment(state.makePayment, action) });
    case Action.SET_TO_APPROVE_PAYMENT_DATA:
      return Object.assign({}, state, {
        approvePayment: approvePayment(state.approvePayment, action),
      });
    case Action.SET_PAYMENT_INFO_DATA:
      return Object.assign({}, state, {
        approved: action.data.approved,
        receipts: action.data.receipts,
      });
    case Action.SET_PAYMENT_EXEMPTS_LIST:
      return Object.assign({}, state, {
        exemptsList: action.data,
      });
    default:
      return state;
  }
};

export default payment;
