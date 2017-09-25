import * as Action from '../actions/constants';

const initialUserSessionState = {
  logged_user: null,
  logged: false,
  token: null,
};

const userSession = (state = initialUserSessionState, action) => {
  switch (action.type) {
    case Action.SET_USER_SESSION_TOKEN:
      localStorage.setItem('sigeva_user_token', action.token);
      return Object.assign({}, state, {
        token: action.token,
      });
    default:
      return state;
  }
};

export default userSession;
