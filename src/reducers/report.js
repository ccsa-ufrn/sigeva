import * as Action from '../actions/constants';

const initialReport = {
  enrollments: null,
  selectedUser: null,
};

const report = (state = initialReport, action) => {
  switch (action.type) {
    case Action.SET_REPORT_ENROLLMENTS:
      return Object.assign({}, state, {
        enrollments: action.data,
      });
    case Action.SET_REPORT_USER:
      return Object.assign({}, state, {
        selectedUser: action.data,
      });
    case Action.CLEAR_REPORT_USER:
      return Object.assign({}, state, {
        selectedUser: null,
      });
    default:
      return state;
  }
};

export default report;
