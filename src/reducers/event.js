import * as Action from '../actions/constants';

const initialEventState = {
  id: null,
  name: null,
  enrollmentPeriod: null,
  thumbnail: null,
  // location: null,
  // roles: null,
  not_found: false,
  loading: true,
  roles: null,
  relationship: null,
  context: null,
  cert: null,
};

const mountObjectData = (data) => {
  return ({
    id: data._id,
    name: data.name,
    thumbnail: data.thumbnail,
    enrollmentPeriod: data.enrollmentPeriod,
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
    case Action.SET_EVENT_ROLES:
      return Object.assign({}, state, {
        roles: action.data,
      });
    case Action.SET_EVENT_RELATIONSHIP:
      return Object.assign({}, state, {
        relationship: action.data,
      });
    case Action.SET_EVENT_CERT:
      return Object.assign({}, state, {
        cert: action.data,
      });
    case Action.SET_EVENT_CONTEXT:
      return Object.assign({}, state, {
        context: action.data,
      });
    default:
      return state;
  }
};

export default event;
