import * as Action from '../actions/constants';

const initialFieldState = [
];

const initialValidationErrors = [
];

const initialRegisterState = {
  fields_requests: [],
  validation_errors: [],
  submission_errors: [],
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

const fields = (prevFields = initialFieldState, action) => {
  switch (action.type) {
    case Action.HANDLE_REGISTER_FIELD_CHANGE:
      return prevFields.map((field) => {
        if (field.name === action.fieldName) {
          return { name: field.name, value: action.value };
        }
        return field;
      });
    case Action.CREATE_FIELD:
      return [
        ...prevFields,
        {
          name: action.field_name,
          value: action.value,
        },
      ];
    default:
      break;
  }
  return prevFields;
};

const validation = (currentFields, prevErrors, action) => {
  const addErrors = [];
  const clearErrors = [];

  if (action.fieldName === 'password') {
    if (action.value.length < 5 || action.value.length > 20) {
      addErrors.push({ field: 'password', message: 'A senha deve possuir entre 5 e 20 caracteres' });
    }
    clearErrors.push('password');
  }

  if (action.fieldName === 'repeat_password' || (action.fieldName === 'password' && currentFields[3].value !== '')) {
    if (action.value !== currentFields[2].value) {
      addErrors.push({ field: 'repeat_password', message: 'A repetição não combina com a senha inserida' });
    }
    clearErrors.push('repeat_password');
  }

  // Clear error
  let newErrors = prevErrors;
  clearErrors.forEach((field) => {
    newErrors = newErrors.filter((error) => {
      return (error.field !== field);
    });
  });

  newErrors = newErrors.concat(addErrors);

  return newErrors;
};

const register = (state = initialRegisterState, action) => {
  let newFields = [];
  if (action.type === Action.RECIEVE_REGISTER_FIELDS) {
    newFields = action.fields.map((field) => {
      return {
        name: field.name,
        value: '',
      };
    });
  }

  let fieldsChanged = null;
  if (action.type === Action.HANDLE_REGISTER_FIELD_CHANGE) {
    fieldsChanged = fields(state.fields, action);
  }
  switch (action.type) {
    case Action.HANDLE_REGISTER_FIELD_CHANGE:
      return Object.assign({}, state, { fields: fieldsChanged, validation_errors: validation(state.fields, state.validation_errors, action) });
    case Action.REQUEST_REGISTER_FIELDS:
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
