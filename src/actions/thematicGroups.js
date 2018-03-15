import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setThematicGroups(data) {
  return ({
    type: Action.SET_TGS_TGS,
    data,
  });
}

export function loadThematicGroups() {
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

    fetch(`${application.url}/api/event/${eventId}/module/thematicgroups/thematicgroups/act/get_tgs`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(setThematicGroups(json.data));
        }
      });
  };
}

export function createThematicGroup(data) {
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
      body: JSON.stringify({
        tgName: data.thematicGroupName,
        tgDescription: data.description,
        areaId: data.areaId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/thematicgroups/thematicgroups/act/create_tg`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(loadThematicGroups());
        }
      });
  };
}

export function updateThematicGroupCoordinators(tgId, coordinators) {
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
      body: JSON.stringify({
        tgId,
        coordinators,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/thematicgroups/thematicgroups/act/update_coordinators`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(loadThematicGroups());
        }
      });
  };
}
