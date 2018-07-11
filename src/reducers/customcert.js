import * as Action from '../actions/constants';

const initialCerts = {
  certs: [],
};

const news = (state = initialCerts, action) => {
  switch (action.type) {
    case Action.SET_SET_OF_CERTS:
      return Object.assign({}, state, {
        certs: action.data,
      });
    default: return state;
  }
};

export default news;
