import * as Action from '../actions/constants';

const initialSubmission = {
  entity: {},
};

const submission = (state = initialSubmission, action) => {
  switch (action.type) {
    case Action.SET_SUBMISSION_ENTITY:
      return Object.assign({}, state, {
        entity: action.data,
      });
    default:
      return state;
  }
};

export default submission;
