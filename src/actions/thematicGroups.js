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
