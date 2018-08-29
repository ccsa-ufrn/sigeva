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

export function setListToPrint(data) {
  return ({
    type: Action.SET_ACTIVITIES_LIST_OF_PRESENCE,
    data,
  });
}

export function setSessions(data) {
  return ({
    type: Action.SET_ACTIVITIES_SESSIONS,
    data,
  });
}

export function setObjectToEdit(data) {
  return ({
    type: Action.SET_ACTIVITIES_OBJECT_TO_EDIT,
    data,
  });
}

export function setAllObjectsToEnroll(data) {
  return ({
    type: Action.SET_ACTIVITIES_ALL_OBJECTS_TO_ENROLL,
    data,
  });
}

export function setAllEnrolledObjects(data) {
  return ({
    type: Action.SET_ACTIVITIES_ALL_ENROLLED_OBJECTS,
    data,
  });
}

export function setAllObjectsSubmited(data) {
  return ({
    type: Action.SET_ACTIVITIES_ALL_OBJECTS_SUBMITED,
    data,
  });
}

export function setEnrolledSessions(sessionsWithoutEntity) {
  const data = sessionsWithoutEntity.reduce((filtered, option) => {
    const newSession = { sessions: option.data.consolidation.sessions, entity: option.entity };
    filtered.push(newSession);
    return filtered;
  }, []);
  return ({
    type: Action.SET_ACTIVITIES_ENROLLED_SESSIONS,
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
          dispatch(setAllObjectsToEnroll(json.data.filter(obj => obj.data.status === 'consolidated')));
        }
      });
  };
}

export function createSession(entitySlug, initialDate, finalDate) {
  console.log(initialDate);
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
        initialDate,
        finalDate,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/create_session`, config)
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

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_sessions`, config)
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

export function consolidateActivity(entitySlug, activityId, sessions, location, vacancies) {
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
        activityId,
        sessions,
        location,
        vacancies,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/consolidate_activity`, config)
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

export function deconsolidateActivity(entitySlug, activityId) {
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
        activityId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/deconsolidate_activity`, config)
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

export function loadAllObjectsToEnroll(entitySlug) {
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

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_all_objects_to_enroll`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(setAllObjectsToEnroll(json.data));
        }
      });
  };
}

export function loadObjects(entitySlug, userId) {
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
        userId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_objects_enrolled`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(setAllEnrolledObjects(json.data));
          dispatch(setEnrolledSessions(json.data));
          dispatch(loadAllObjects(entitySlug));
        }
      });
  };
}

export function loadAllObjectsSubmited(entitySlug, userId) {
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
        userId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_objects_submited`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(setAllObjectsSubmited(json.data));
        }
      });
  };
}

export function enroll(entitySlug, enrollObject) {
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
      body: JSON.stringify({
        activityId: enrollObject.activityId,
        userId: enrollObject.userId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/enroll_in_object`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(getListToPrint(entitySlug, enrollObject.activityId));
          dispatch(loadObjects(entitySlug, enrollObject.userId));
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
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        objectId,
        type,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/emit_certificate`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(getListToPrint(entitySlug, objectId));
          dispatch(loadAllObjects(entitySlug));
        }
      });
  };
}

export function exit(entitySlug, enrollObject) {
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
      body: JSON.stringify({
        activityId: enrollObject.activityId,
        userId: enrollObject.userId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/exit_object`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(getListToPrint(entitySlug, enrollObject.activityId));
          dispatch(loadObjects(entitySlug, enrollObject.userId));
        }
      });
  };
}

export function getListToPrint(entitySlug, activityId) {
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
      body: JSON.stringify({
        activityId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/get_list_to_print`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(setListToPrint(json.data));
        }
      });
  };
}

export function setPresence(entitySlug, presence) {
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
      body: JSON.stringify({
        presence: presence.presence,
        enrollmentId: presence.enrollmentId,
        activityId: presence.objId,
      }),
    };

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/set_presence`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(getListToPrint(entitySlug, presence.objId));
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

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/edit_object`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // TODO handle this error
        } else {
          const newObject = json.data.ofObjects.filter(object => object._id == data._id)[0];
          dispatch(setObjectToEdit(newObject));
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

    fetch(`${application.url}/api/event/${eventId}/module/activities/${entitySlug}/act/edit_entity`, config)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          // handle this error
        } else {
          dispatch(loadActivitiesEntity(entitySlug));
        }
      });
  };
}
