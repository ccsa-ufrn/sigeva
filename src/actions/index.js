import * as Action from './constants';

export default function changeFieldValue(value) {
  return ({
    type: Action.CHANGE_FIELD_VALUE,
    value,
  });
}
