import { connect } from 'react-redux';

import HomePage from './HomePage';

const mapStateToProps = (state) => {
  return {
    logged: state.userSession.logged,
  }
}

const HomePageContainer = connect(
  mapStateToProps
)(HomePage);

export default HomePageContainer;
