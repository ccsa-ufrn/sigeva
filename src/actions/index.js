import * as Action from './constants';

export function changeFieldValue(fieldName, value) {
  return ({
    type: Action.CHANGE_FIELD_VALUE,
    field_name: fieldName,
    value,
  });
}

export function createField(fieldName, value = '') {
  return ({
    type: Action.CREATE_FIELD,
    field_name: fieldName,
    value,
  });
}

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

// thunk redux
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
