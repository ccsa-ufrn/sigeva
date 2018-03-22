import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setSubmissionEntity(data) {
  return ({
    type: Action.SET_SUBMISSION_ENTITY,
    data,
  });
}

export function setUserObjects(data) {
  return ({
    type: Action.SET_SUBMISSION_USER_OBJECTS,
    data,
  });
}

export function setAllObjects(data) {
  return ({
    type: Action.SET_SUBMISSION_ALL_OBJECTS,
    data,
  });
}

export function setToApproveSubmission(data) {
  return ({
    type: Action.SET_SUBMISSION_TO_APPROVE,
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

export function loadUserObjects(entitySlug) {
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/get_my_objects`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(setUserObjects(json.data));
        }
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/get_all_objects`, config)
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/submit_object`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(loadUserObjects(entitySlug));
        }
      });
  };
}

export function loadObjectsToEvaluate(entitySlug) {
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/get_to_evaluate_submissions`, config)
      .then(response => response.json())
      .then((json) => {
        dispatch(setToApproveSubmission(json.data));
      });
  };
}

export function changeObjectState(entitySlug, objectId, newState) {
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
        objectId,
        newState,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/change_object_state`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(loadObjectsToEvaluate(entitySlug));
        }
      });
  };
}

export function rejectSubmission(objectId, entitySlug) {
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
        submissionId: data.id,
        entitySlug: data.slug,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/reject_submission`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(loadToApproveSubmission(entitySlug));
        }
      });
  };
}
