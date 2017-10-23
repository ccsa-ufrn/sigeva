import { connect } from 'react-redux';
import { logoutUserSession, loadUserIfNeed } from '../../actions/userSession';
import MainHeaderBarContent from './MainHeaderBarContent';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUserSession());
    },
    loadUserInfo: () => {
      dispatch(loadUserIfNeed());
    }
  };
};

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
  };
};

const MainHeaderBarContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHeaderBarContent);

export default MainHeaderBarContentContainer;
