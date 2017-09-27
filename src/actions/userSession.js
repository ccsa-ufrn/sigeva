import * as Action from './constants';

export function setUserSessionToken(token) {
  return ({
    type: Action.SET_USER_SESSION_TOKEN,
    token,
  });
}

function fetchUserMe(token) {
  const config = {
    method: 'POST',
    mode: 'cors',
    timeout: 3000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  fetch('/api/user/me', config)
    .then((response) => {
      return response.json();
    });
}

// Thunk redux action that loads user from database if needed
export function loadUserIfNeed(token) {
  return (dispatch, getState) => {
    if (getState().userSession.logged_user === null) {
      // User not logged yet
      fetchUserMe(token)
        .then(); // TODO
    }
  };
}
