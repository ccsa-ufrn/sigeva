import * as Action from '../actions/constants';

const initialActivities = {
  entity: null,
};

const activities = (state = initialActivities, action) => {
  switch (action.type) {
    case Action.SET_ACTIVITIES_ENTITY:
      return Object.assign({}, state, {
        entity: action.data,
      });
    default:
      return state;
  }
};

export default activities;
