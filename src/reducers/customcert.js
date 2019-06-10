import * as Action from '../actions/constants';

const initialCerts = {
  certs: [],
  objectToEdit: [],
};

const news = (state = initialCerts, action) => {
  switch (action.type) {
    case Action.SET_SET_OF_CERTS:
      return Object.assign({}, state, {
        certs: action.data,
      });
    case Action.SET_CUSTOMCERT_OBJECT_TO_EDIT:
      return Object.assign({}, state, {
        objectToEdit: action.data,
      });
    default: return state;
  }
};

export default news;
