import * as Action from '../actions/constants';
import fields from './fields';

const initialRegisterState = {
  fields_requests: [],
  validation_errors: [],
  fields_loading: true,
  fields_load_error: true,
  register_success: false,
  fields: [
    {
      name: 'name',
      value: '',
    },
    {
      name: 'email',
      value: '',
    },
    {
      name: 'password',
      value: '',
    },
    {
      name: 'repeat_password',
      value: '',
    },
  ],
};

const register = (state = initialRegisterState, action) => {
  switch (action.type) {
    case Action.CHANGE_VALUE:
      return Object.assign({}, state, { fields: fields(state.fields, action) });
    default:
      break;
  }
  return state;
};

export default register;
