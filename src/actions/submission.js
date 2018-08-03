import fetch from 'isomorphic-fetch';
import { application } from '../../config';
import * as Action from './constants';

export function setSubmissionEntity(data) {
  return ({
    type: Action.SET_SUBMISSION_ENTITY,
    data,
  });
}

export function setSessions(data) {
  return ({
    type: Action.SET_SUBMISSIONS_SESSIONS,
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

export function setObjectToEdit(data) {
  return ({
    type: Action.SET_SUBMISSION_OBJECT_TO_EDIT,
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

export function editObject(entitySlug, data) {
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/edit_object`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          const newObject = json.data.ofObjects.filter(object => object._id == data._id)[0];
          dispatch(loadUserObjects(entitySlug));
          dispatch(setObjectToEdit(newObject));
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
          dispatch(loadAllObjects(entitySlug));
        }
      });
  };
}

export function emitCertificate(entitySlug, objectId, type) {
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
        type,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/emit_certificate`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          dispatch(loadAllObjects(entitySlug));
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

export function loadSessions(entitySlug) {
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

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/get_sessions`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(setSessions(json.data));
        }
      });
  };
}

export function createSession(entitySlug, date, shift, hour) {
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
        date,
        shift,
        hour,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/create_session`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(loadSessions(entitySlug));
        }
      });
  };
}

export function scheduleSubmissions(entitySlug, selectedSubmissions, sessions, location) {
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
        selectedSubmissions,
        sessions,
        location,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/schedule_submissions`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(loadAllObjects(entitySlug));
        }
      });
  };
}


export function cancelSubmissionPresentation(entitySlug, submissionId) {
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
        submissionId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/cancel_submission_presentation`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(loadAllObjects(entitySlug));
        }
      });
  };
}

// Actions related to administering entities

export function editEntity(entitySlug, stateObject) {
  return (dispatch, getState) => {
    const eventId = getState().event.id;

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stateObject),
    };

    fetch(`${application.url}/api/event/${eventId}/module/submission/${entitySlug}/act/edit_entity`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(loadSubmissionEntity(entitySlug));
        }
      });
  };
}
