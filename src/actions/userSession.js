import * as Action from './constants';

export function setUserSessionToken(token) {
  return ({
    type: Action.SET_USER_SESSION_TOKEN,
    token,
  });
}
