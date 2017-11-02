import * as Action from '../actions/constants';

const initialEventState = {
  id: null,
  name: null,
  // location: null,
  // roles: null,
  not_found: false,
  loading: true,
};

const mountObjectData = (data) => {
  return ({
    id: data._id,
    name: data.name,
  });
};

const event = (state = initialEventState, action) => {
  switch (action.type) {
    case Action.EVENT_PAGE_NOT_FOUND:
      return Object.assign({}, state, {
        not_found: true,
      });
    case Action.EVENT_PAGE_LOADED:
      return Object.assign({}, state, {
        loading: false,
      });
    case Action.SET_EVENT_PAGE_DATA:
      return Object.assign({}, state, mountObjectData(action.data));
    default:
      return state;
  }
};

export default event;
