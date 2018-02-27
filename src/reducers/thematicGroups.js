import * as Action from '../actions/constants';

const initialThematicGroups = {
  thematicGroups: [],
};

const thematicGroups = (state = initialThematicGroups, action) => {
  switch (action.type) {
    case Action.SET_TGS_TGS:
      return Object.assign({}, state, {
        thematicGroups: action.data,
      });
    default:
      return state;
  }
};

export default thematicGroups;
