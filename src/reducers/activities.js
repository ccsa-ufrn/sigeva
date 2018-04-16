import * as Action from '../actions/constants';

const initialActivities = {
  entity: null,
  allObjects: [],
  sessions: [],
  allObjectsToEnroll: [],
  allObjectsUserEnrolled: [],
  listOfEnrolledSessions: [],
};

const activities = (state = initialActivities, action) => {
  switch (action.type) {
    case Action.SET_ACTIVITIES_ENTITY:
      return Object.assign({}, state, {
        entity: action.data,
      });
    case Action.SET_ACTIVITIES_ALL_OBJECTS:
      return Object.assign({}, state, {
        allObjects: action.data,
      });
    case Action.SET_ACTIVITIES_SESSIONS:
      return Object.assign({}, state, {
        sessions: action.data,
      });
    case Action.SET_ACTIVITIES_ALL_OBJECTS_TO_ENROLL:
      return Object.assign({}, state, {
        allObjectsToEnroll: action.data,
      });
    case Action.SET_ACTIVITIES_ALL_ENROLLED_OBJECTS:
      return Object.assign({}, state, {
        allObjectsUserEnrolled: action.data,
      });
    case Action.SET_ACTIVITIES_ENROLLED_SESSIONS:
      return Object.assign({}, state, {
        listOfEnrolledSessions: action.data,
      });
    default:
      return state;
  }
};

export default activities;
