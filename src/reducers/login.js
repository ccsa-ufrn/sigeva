import * as Action from '../actions/constants';

const initialLoginState = {
  email: '',
  password: '',
  doingLogin: false,
  success: false,
  errorMessage: '',
};

const fieldChange = (action) => {
  const obj = {};
  obj[action.fieldName] = action.value;
  return obj;
};

const login = (state = initialLoginState, action) => {
  switch (action.type) {
    case Action.DOING_LOGIN:
      return Object.assign({}, state, {
        doingLogin: true,
        success: false,
      });
    case Action.DID_LOGIN_WITH_SUCCESS:
      return Object.assign({}, state, {
        doingLogin: false,
        success: true,
      });
    case Action.HANDLE_LOGIN_FIELD_CHANGE:
      return Object.assign({}, state, fieldChange(action));
    case Action.DID_LOGIN_WITH_ERROR:
    case Action.DID_LOGIN_WITH_FAILURE:
      return Object.assign({}, state, {
        doingLogin: false,
        success: false,
        errorMessage: action.message,
      });
    default:
      return state;
  }
};

export default login;
