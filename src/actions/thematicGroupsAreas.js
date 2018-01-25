import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setThematicGroupsAreasAreas(data) {
  return ({
    type: Action.SET_TGS_AREAS_AREAS,
    data,
  });
}

export function loadThematicGroupsAreasAreas() {
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

    fetch(`${application.url}/api/event/${eventId}/module/thematicgroups/thematicgroups/act/get_areas`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(setThematicGroupsAreasAreas(json.data));
        }
      });
  };
}
