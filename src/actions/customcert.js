import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setCerts(data) {
  return ({
    type: Action.SET_SET_OF_CERTS,
    data,
  });
}

export function loadCerts() {
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

    fetch(`${application.url}/api/event/${eventId}/module/cert/cert/act/get_certs`, config)
      .then(response => response.json())
      .then((data) => {
        if (!data.error) {
          dispatch(setCerts(data.data));
        }
      });
  };
}

export function createNew(text) {
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
      body: JSON.stringify({ text }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/cert/cert/act/create_certificate`, config)
      .then(response => response.json())
      .then((json) => {
        if (!json.error) {
          dispatch(loadCerts());
        }
      });
  };
}
