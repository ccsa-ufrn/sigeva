import { connect } from 'react-redux';

import { loadUserIfNeed } from '../../actions/userSession';

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
    }
  };
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;
