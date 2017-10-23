import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setUserSessionToken(token) {
  return ({
    type: Action.SET_USER_SESSION_TOKEN,
    token,
  });
}

export function setUserData(data) {
  return ({
    type: Action.SET_USER_SESSION_DATA,
    data,
  });
}

function fetchUserMe() {
  const config = {
    method: 'GET',
    mode: 'cors',
    timeout: 3000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  return fetch(`${application.url}/api/user/me`, config)
    .then((response) => {
      return response.json();
    });
}

// Thunk redux action that loads user from database if needed
export function loadUserIfNeed() {
  return (dispatch, getState) => {
    if (getState().userSession.logged_user === null &&
        getState().userSession.token !== null) {
      // User not logged yet
      fetchUserMe()
        .then((json) => {
          dispatch(setUserData(json.data));
        });
    }
  };
}

export function clearUserSessionData() {
  return ({
    type: Action.CLEAR_USER_SESSION_DATA,
  });
}

export function logoutUserSession() {
  return (dispatch) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      timeout: 3000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
    dispatch(clearUserSessionData());
    return fetch(`${application.url}/api/user/logout`, config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (!json.error) {
          dispatch(clearUserSessionData());
        }
      }); // TODO: Can we get a error?
  };
}
