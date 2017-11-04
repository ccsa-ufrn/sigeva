import { connect } from 'react-redux';

import { loadUserIfNeed, reloadUser } from '../../actions/userSession';

import Dashboard from './Dashboard';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserIfNeed: () => {
      dispatch(loadUserIfNeed());
    },
    reloadUser: () => {
      dispatch(reloadUser());
    }
  };
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;
