import * as Action from '../actions/constants';

const initialNews = {
  news: [],
};

const news = (state = initialNews, action) => {
  switch (action.type) {
    case Action.SET_SET_OF_NEWS:
      return Object.assign({}, state, {
        news: action.data,
      });
    default: return state;
  }
};

export default news;
