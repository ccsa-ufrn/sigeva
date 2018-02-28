import { connect } from 'react-redux';
import NewsModule from './NewsModule';

import { createNew, loadNews } from '../../../actions/news';

const mapStateToProps = state => {
  return {
    news: state.news.news,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNew: (title, text) => {
      dispatch(createNew(title, text));
    },
    loadNews: () => {
      dispatch(loadNews());
    }
  };
}

const NewsModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsModule);

export default NewsModuleContainer;
