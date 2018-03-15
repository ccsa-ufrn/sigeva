import * as Action from '../actions/constants';

const initialSubmission = {
  entity: null,
  userObjects: [],
  objectsToApprove: [],
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
        objectsToApprove: action.data,
      });
    case Action.APPROVE_SUBMISSION:
      return Object.assign({}, state, {
        objectsToApprove: action.data,
      });
    case Action.REJECT_SUBMISSION:
      return Object.assign({}, state, {
        objectsToApprove: action.data,
      });
    default:
      return state;
  }
};

export default submission;
