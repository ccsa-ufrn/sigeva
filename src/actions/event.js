import fetch from 'isomorphic-fetch';
import { application } from '../../config';
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
