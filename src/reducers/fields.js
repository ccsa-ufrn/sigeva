import * as Action from '../actions/constants';

const initialFieldState = [
];

const fields = (prevFields = initialFieldState, action) => {
  switch (action) {
    case Action.CHANGE_FIELD_VALUE:
      return prevFields.map((field) => {
        if (field.name === action.field_name) {
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
