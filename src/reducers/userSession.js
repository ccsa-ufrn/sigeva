import * as Action from '../actions/constants';

const initialUserSessionState = {
  logged_user: null,
  logged: false,
  token: null,
};

const userSession = (state = initialUserSessionState, action) => {
  switch (action.type) {
    case Action.SET_USER_SESSION_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        logged: true,
      });
    case Action.SET_USER_SESSION_DATA:
      return Object.assign({}, state, {
        logged_user: action.data,
        logged: true,
      });
    default:
      return state;
  }
};

export default userSession;
