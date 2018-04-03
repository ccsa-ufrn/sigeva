import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setActivitiesEntity(data) {
  return ({
    type: Action.SET_ACTIVITIES_ENTITY,
    data,
  });
}

export function setAllObjects(data) {
  return ({
    type: Action.SET_ACTIVITIES_ALL_OBJECTS,
    data,
  });
}

export function loadActivitiesEntity(entitySlug) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_entity`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(setActivitiesEntity(json.data));
        }
      });
  };
}

export function submitObject(entitySlug, data) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/submit_object`, config)
      .then(response => response.json())
      .then((json) => {
        // DO SOMETHING
      });
  };
}


export function loadAllObjects(entitySlug) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_all_objects`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(setAllObjects(json.data));
        }
      });
  };
}
