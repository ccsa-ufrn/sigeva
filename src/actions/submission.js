import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setSubmissionEntity(data) {
  return ({
    type: Action.SET_SUBMISSION_ENTITY,
    data,
  });
}

export function loadSubmissionEntity(entitySlug) {
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/get_entity`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(setSubmissionEntity(json.data));
        }
      });
  };
}
