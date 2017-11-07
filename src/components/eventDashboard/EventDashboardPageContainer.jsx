import { connect } from 'react-redux';

import { loadUserIfNeed, reloadUser } from '../../actions/userSession';

import EventDashboardPage from './EventDashboardPage';

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
    },
  };
}

const EventDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDashboardPage);

export default EventDashboardPageContainer;
