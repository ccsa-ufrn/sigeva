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

    fetch(`${application.url}/event/${eventId}/module/payment/payment/act/submit_receipt`, config)
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
