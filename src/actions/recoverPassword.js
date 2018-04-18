import fetch from 'isomorphic-fetch';
import { application } from '../../config';

export function requirePasswordRecovering(email) {
  return () => {
    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };

    fetch(`${application.url}/api/user/recover-password`, config)
      .then(response => response.json())
      .then(() => {
      })
      .catch(() => {
      });
  };
}

export function createNewPassword(newPass, userId, code) {
  return () => {
    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: newPass, userId, code }),
    };

    fetch(`${application.url}/api/user/new-password`, config)
      .then(response => response.json())
      .then(() => {
      })
      .catch(() => {
      });
  };
}
