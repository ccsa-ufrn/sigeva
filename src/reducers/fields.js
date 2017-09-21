import * as Action from '../actions/constants';

const initialFieldState = [
];

const fields = (prevFields = initialFieldState, action) => {
  console.log('here');
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

export default fields;
