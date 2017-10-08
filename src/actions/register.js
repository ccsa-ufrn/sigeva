import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function requestRegisterFields() {
  return ({
    type: Action.REQUEST_REGISTER_FIELDS,
  });
}

export function recieveRegisterFields(json) {
  return ({
    type: Action.RECIEVE_REGISTER_FIELDS,
    fields: json,
  });
}

export function handleRegisterFieldChange(fieldName, value) {
  return ({
    type: Action.HANDLE_REGISTER_FIELD_CHANGE,
    fieldName,
    value,
  });
}

export function addRegisterError(fieldName, message) {
  return ({
    type: Action.ADD_REGISTER_ERROR,
    fieldName,
    message,
  });
}

export function doingRegisterSubmition() {
  return ({
    type: Action.DOING_REGISTER_SUBMITION,
  });
}

export function didRegisterWithSuccess() {
  return ({
    type: Action.DID_REGISTER_WITH_SUCCESS,
  });
}

export function didRegisterWithError() {
  return ({
    type: Action.DID_REGISTER_WITH_ERROR,
  });
}

export function didRegisterSystemFailure() {
  return ({
    type: Action.DID_REGISTER_SYSTEM_FAILURE,
  });
}

// Thunk Redux to fetch Register Fields Requests
export function fetchRegisterFields() {
  return (dispatch) => {
    dispatch(requestRegisterFields());
    const config = { method: 'GET', mode: 'cors', timeout: 3000 };
    return fetch(`${application.url}/api/system/register_fields_requests`, config)
      .then(
        response => response.json(),
        error => console.log('An error ocurred', error),
      )
      .then(json => dispatch(recieveRegisterFields(json.data)));
  };
}

// Thunk Redux to run a register submition
export function submitRegister(event, fields) {
  event.preventDefault();
  return (dispatch) => {
    // Compare password and repeat password
    if (fields[3].value !== fields[2].value) {
      dispatch(addRegisterError('repeat_password', 'A repetição não combina com a senha inserida'));
    } else {
      dispatch(doingRegisterSubmition());
      // Convert fields before submit
      const parsedFields = {};
      fields.forEach((field) => {
        parsedFields[field.name] = field.value;
      });

      const config = {
        method: 'POST',
        mode: 'cors',
        timeout: 3000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedFields),
      };
      return fetch(`${application.url}/api/user`, config)
        .then((response) => {
          return (response.json());
        })
        .then((json) => {
          if (json.error) {
            json.data.forEach((error) => {
              dispatch(addRegisterError(error.field, error.message));
            });
            if (json.data.length > 0) {
              dispatch(didRegisterWithError());
            }
          } else {
            dispatch(didRegisterWithSuccess());
          }
        })
        .catch((err) => {
          dispatch(didRegisterSystemFailure());
        });
    }
  };
}
