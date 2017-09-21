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
