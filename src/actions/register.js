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

// Thunk Redux to fetch Register Fields Requests
export function fetchRegisterFields() {
  return (dispatch) => {
    dispatch(requestRegisterFields());
    const config = { method: 'GET', mode: 'cors', timeout: 3000 };
    return fetch('/api/system/register_fields_requests', config)
      .then(
        response => response.json(),
        error => console.log('An error ocurred', error),
      )
      .then(json => dispatch(recieveRegisterFields(json.data)));
  };
}

// Thunk Redux to run a register submition
// export function submitRegister(event, fields) {
//   return (dispatch) => {
//     event.preventDefault();
//     dispatch()
//   }
// }
