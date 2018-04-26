import * as Action from '../actions/constants';

const initialReport = {
  enrollments: null,
};

const report = (state = initialReport, action) => {
  switch (action.type) {
    case Action.SET_REPORT_ENROLLMENTS:
      return Object.assign({}, state, {
        enrollments: action.data,
      });
    default:
      return state;
  }
};

export default report;
