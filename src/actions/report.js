import fetch from 'isomorphic-fetch';
import * as Action from '../actions/constants';
import { application } from '../../config';

export function setEnrollments(data) {
  return ({
    type: Action.SET_REPORT_ENROLLMENTS,
    data,
  });
}

export function loadEnrollments() {
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

    fetch(`${application.url}/api/event/${eventId}/module/report/report/act/get_all_enrollments`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(setEnrollments(json.data));
        }
      });
  };
}
