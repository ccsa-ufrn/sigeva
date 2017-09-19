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
  console.log(action);
  let newFields = [];
  if (action.type === Action.RECIEVE_REGISTER_FIELDS) {
    newFields = action.fields.map((field) => {
      return {
        name: field.name,
        value: '',
      };
    });
  }
  switch (action.type) {
    case Action.CHANGE_VALUE:
      return Object.assign({}, state, { fields: fields(state.fields, action) });
    case Action.FETCH_REGISTER_FIELDS:
      return Object.assign({}, state, { fields_loading: true, fields_load_error: false });
    case Action.RECIEVE_REGISTER_FIELDS:
      return Object.assign({}, state,
        { fields_loading: false,
          fields_requests: action.fields,
          fields: [...state.fields, ...newFields],
        });
    default:
      return state;
  }
};

export default register;
