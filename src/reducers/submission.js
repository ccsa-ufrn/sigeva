import * as Action from '../actions/constants';

const initialSubmission = {
  entity: null,
  userObjects: [],
  allObjects: [],
  objectsToEvaluate: [],
  sessions: [],
  objectToEdit: [],
};

const submission = (state = initialSubmission, action) => {
  switch (action.type) {
    case Action.SET_SUBMISSION_ENTITY:
      return Object.assign({}, state, {
        entity: action.data,
      });
    case Action.SET_SUBMISSION_USER_OBJECTS:
      return Object.assign({}, state, {
        userObjects: action.data,
      });
    case Action.SET_SUBMISSION_TO_APPROVE:
      return Object.assign({}, state, {
        objectsToEvaluate: action.data,
      });
    case Action.SET_SUBMISSION_ALL_OBJECTS:
      return Object.assign({}, state, {
        allObjects: action.data,
      });
    case Action.SET_SUBMISSIONS_SESSIONS:
      return Object.assign({}, state, {
        sessions: action.data,
      });
    case Action.SET_OBJECT_TO_EDIT:
      return Object.assign({}, state, {
        objectToEdit: action.data,
      });
    default:
      return state;
  }
};

export default submission;
