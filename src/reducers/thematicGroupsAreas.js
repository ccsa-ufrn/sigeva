import * as Action from '../actions/constants';

const initialThematicGroupsAreas = {
  areas: [],
};

const thematicGroupsAreas = (state = initialThematicGroupsAreas, action) => {
  switch (action.type) {
    case Action.SET_TGS_AREAS_AREAS:
      return Object.assign({}, state, {
        areas: action.data,
      });
    default:
      return state;
  }
};

export default thematicGroupsAreas;
