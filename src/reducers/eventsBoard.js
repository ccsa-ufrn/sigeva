import * as Action from '../actions/constants';

const initialState = {
  events: [],
  loading: true,
  error: false,
};

const eventsBoard = (state = initialState, action) => {
  switch (action.type) {
    case Action.SET_EVENTS_BOARD_CONTENT:
      return Object.assign({}, state, {
        events: action.data,
        loading: false,
      });
    case Action.DID_LOAD_EVENTS_BOARD_WITH_ERROR:
      return Object.assign({}, state, {
        error: true,
      });
    default:
      return state;
  }
};

export default eventsBoard;
