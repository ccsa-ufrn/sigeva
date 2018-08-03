import * as Action from '../actions/constants';

const initialActivities = {
  entity: null,
  allObjects: [],
  sessions: [],
  allObjectsToEnroll: [],
  allObjectsUserEnrolled: [],
  allObjectsSubmited: [],
  listOfEnrolledSessions: [],
  listOfPresence: [],
  objectToEdit: [],
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
    case Action.SET_ACTIVITIES_LIST_OF_PRESENCE:
      return Object.assign({}, state, {
        listOfPresence: action.data,
      });
    case Action.SET_ACTIVITIES_ALL_OBJECTS_SUBMITED:
      return Object.assign({}, state, {
        allObjectsSubmited: action.data,
      });
    case Action.SET_ACTIVITIES_OBJECT_TO_EDIT:
      return Object.assign({}, state, {
        objectToEdit: action.data,
      });
    default:
      return state;
  }
};

export default activities;
