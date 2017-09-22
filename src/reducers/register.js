import * as Action from '../actions/constants';

const initialFieldState = [
];

const initialValidationErrors = [
];

const initialRegisterState = {
  fields_requests: [],
  validation_errors: [],
  submition_loading: false,
  fields_loading: true,
  fields_load_error: true,
  register_success: false,
  system_failure: false,
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

const fields = (prevFields = initialRegisterState, action) => {
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

const addError = (prevErrors, fieldName, message) => {
  return [
    ...prevErrors,
    {
      field: fieldName,
      message,
    },
  ];
};

const validation = (currentFields, prevErrors, action) => {
  const errorsToAdd = [];
  const errorsFieldToClear = [];

  if (action.fieldName === 'password') {
    if (action.value.length < 5 || action.value.length > 20) {
      errorsToAdd.push({ field: 'password', message: 'A senha deve possuir entre 5 e 20 caracteres' });
    }
    errorsFieldToClear.push('password');
  }

  if (action.fieldName === 'repeat_password' || (action.fieldName === 'password' && currentFields[3].value !== '')) {
    if (action.value !== currentFields[2].value) {
      errorsToAdd.push({ field: 'repeat_password', message: 'A repetição não combina com a senha inserida' });
    }
    errorsFieldToClear.push('repeat_password');
  }

  // Clear error
  let cleanPrevErrors = prevErrors;
  errorsFieldToClear.forEach((field) => {
    cleanPrevErrors = cleanPrevErrors.filter((error) => {
      return (error.field !== field);
    });
  });

  let newErrorsValidation = cleanPrevErrors;
  errorsToAdd.forEach((err) => {
    newErrorsValidation = addError(newErrorsValidation, err.field, err.message);
  });

  return newErrorsValidation;
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
      return Object.assign({}, state, {
        fields: fieldsChanged,
        validation_errors: validation(state.fields, state.validation_errors, action)
      });
    case Action.REQUEST_REGISTER_FIELDS:
      return Object.assign({}, state, {
        fields_loading: true, fields_load_error: false,
      });
    case Action.DOING_REGISTER_SUBMITION:
      return Object.assign({}, state, {
        validation_errors: [],
        fields_loading: false,
        submition_loading: true,
        register_success: false,
      });
    case Action.RECIEVE_REGISTER_FIELDS:
      return Object.assign({}, state,
        {
          fields_loading: false,
          fields_requests: action.fields,
          submition_loading: false,
          validation_errors: [],
          fields_load_error: true,
          register_success: false,
          system_failure: false,
          fields: [...state.fields, ...newFields],
        });
    case Action.ADD_REGISTER_ERROR:
      return Object.assign({}, state,
        {
          validation_errors: addError(state.validation_errors, action.fieldName, action.message),
        });
    case Action.DID_REGISTER_WITH_SUCCESS:
      return Object.assign({}, state,
        {
          submition_loading: false,
          register_success: true,
        });
    case Action.DID_REGISTER_WITH_ERROR:
      return Object.assign({}, state,
        {
          submition_loading: false,
        });
    case Action.DID_REGISTER_SYSTEM_FAILURE:
      return Object.assign({}, state,
        {
          system_failure: true,
        });
    default:
      return state;
  }
};

export default register;
