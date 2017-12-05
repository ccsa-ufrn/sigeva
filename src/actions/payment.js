import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function doingPaymentReceiptSubmit() {
  return ({
    type: Action.DOING_PAYMENT_RECEIPT_SUBMIT,
  });
}

export function didPaymentReceiptSubmitWithSuccess() {
  return ({
    type: Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_SUCCESS,
  });
}

export function didPaymentReceiptSubmitWithFailure() {
  return ({
    type: Action.DID_PAYMENT_RECEIPT_SUBMIT_WITH_FAILURE,
  });
}

export function setPaymentInfoData(data) {
  return ({
    type: Action.SET_PAYMENT_INFO_DATA,
    data,
  });
}

export function setToApprovePayments(data) {
  return ({
    type: Action.SET_TO_APPROVE_PAYMENT_DATA,
    data,
  });
}

export function submitReceipt(fileId) {
  return (dispatch, getState) => {
    dispatch(doingPaymentReceiptSubmit());
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/payment/payment/act/submit_receipt`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          dispatch(didPaymentReceiptSubmitWithSuccess());
        } else {
          dispatch(didPaymentReceiptSubmitWithFailure());
        }
      })
      .catch(() => {
        dispatch(didPaymentReceiptSubmitWithFailure());
      });
  };
}

export function loadPaymentInfo(eventId = null) {
  return (dispatch, getState) => {
    const eventIdFromState = getState().event.id;
    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${eventIdFromState || eventId}/module/payment/payment/act/get_info`, config)
      .then(response => response.json())
      .then((json) => {
        dispatch(setPaymentInfoData(json.data));
      });
  };
}

export function loadToApprovePayments() {
  return (dispatch, getState) => {
    const eventId = getState().event.id;
    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${eventId}/module/payment/payment/act/get_to_approve_payments`, config)
      .then(response => response.json())
      .then((json) => {
        dispatch(setToApprovePayments(json.data));
      });
  };
}
