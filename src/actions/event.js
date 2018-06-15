import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import { fetchUserMe } from './userSession';
import * as Action from './constants';

export function eventNotFound() {
  return ({
    type: Action.EVENT_PAGE_NOT_FOUND,
  });
}

export function setEventData(data) {
  return ({
    type: Action.SET_EVENT_PAGE_DATA,
    data,
  });
}

export function eventLoaded() {
  return ({
    type: Action.EVENT_PAGE_LOADED,
  });
}

export function setEventRoles(data) {
  return ({
    type: Action.SET_EVENT_ROLES,
    data,
  });
}

export function setRelationship(data) {
  return ({
    type: Action.SET_EVENT_RELATIONSHIP,
    data,
  });
}

export function setCertificate(data) {
  return ({
    type: Action.SET_EVENT_CERT,
    data,
  });
}

export function setContext(data) {
  return ({
    type: Action.SET_EVENT_CONTEXT,
    data,
  });
}

export function loadEventRoles(id) {
  return (dispatch) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      timeout: 3000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${id}/role`, config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          return;
        }
        dispatch(setEventRoles(json.data));
      });
  };
}

export function loadRelationship(id) {
  return (dispatch) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      timeout: 3000,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${id}/relationship`, config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (!json.error) {
          dispatch(setRelationship(json.data.roles));
          dispatch(setCertificate(json.data.cert));
        }
      });
  };
}

// Thunk Redux action to load event data
export function loadEvent(id) {
  return (dispatch) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      timeout: 3000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${id}`, config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          dispatch(eventNotFound());
        } else {
          dispatch(setEventData(json.data));
          dispatch(eventLoaded());
        }
      })
      .catch(() => {
        dispatch(eventNotFound());
      });
  };
}

// Thunk Redux action to load event data (if need)
export function loadEventIfNeed(id) {
  return (dispatch, getState) => {
    if (getState().event.id !== id) {
      dispatch(loadEvent(id));
    }
  };
}

export function enrollUser(role) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      timeout: 3000,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    };

    fetch(`${application.url}/api/event/${eventId}/enroll`, config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (!json.error) {
          dispatch(loadRelationship(eventId));
        } else {
          dispatch(eventNotFound());
        }
      })
      .catch(() => {
        dispatch(eventNotFound());
      });
  };
}

export function loadContext(eventId) {
  return (dispatch) => {

    const config = {
      method: 'GET',
      mode: 'cors',
      timeout: 3000,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${eventId}/context`, config)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (!json.error) {
          dispatch(setContext(json.data));
        } else {
          dispatch(eventNotFound());
        }
      });
  };
}

export function loadCertificate(code) {
  const config = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${application.url}/api/event/cert/${code}`, config)
    .then(resp => resp.json());
}
