import * as Action from './constants';
import { setUserSessionToken } from './userSession';

export function doingLogin() {
  return ({
    type: Action.DOING_LOGIN,
  });
}

export function didLoginWithSuccess() {
  return ({
    type: Action.DID_LOGIN_WITH_SUCCESS,
  });
}

export function didLoginWithError(message) {
  return ({
    type: Action.DID_LOGIN_WITH_ERROR,
    message,
  });
}

export function didLoginWithFailure(message) {
  return ({
    type: Action.DID_LOGIN_WITH_FAILURE,
    message,
  });
}

export function handleLoginFieldChange(fieldName, value) {
  return ({
    type: Action.HANDLE_LOGIN_FIELD_CHANGE,
    fieldName,
    value,
  });
}

// Thunk Redux action to submit a login form
export function submitLogin(event, fields) {
  event.preventDefault();
  return (dispatch) => {
    dispatch(doingLogin());

    if (fields.email === '' || fields.password === '') {
      dispatch(didLoginWithError('Preencha todos os campos para efetuar login'));
      return;
    }

    const config = {
      method: 'POST',
      mode: 'cors',
      timeout: 3000,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    };

    fetch('/api/user/authorize', config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          dispatch(didLoginWithError(json.error_info));
        } else if (json.data.token) {
          dispatch(setUserSessionToken(json.data.token));
          dispatch(didLoginWithSuccess());
        } else {
          dispatch(didLoginWithFailure('Falha não esperada do sistema'));
        }
      })
      .catch(() => {
        dispatch(didLoginWithFailure('Falha não esperada do sistema'));
      });
  };
}
