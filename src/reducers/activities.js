import * as Action from '../actions/constants';

const initialActivities = {
  entity: null,
  allObjects: [],
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
    default:
      return state;
  }
};

export default activities;
