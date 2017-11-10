import { connect } from 'react-redux';

import { loadUserIfNeed, reloadUser } from '../../actions/userSession';
import { loadEventIfNeed, loadRelationship, loadContext } from '../../actions/event';

import EventDashboardPage from './EventDashboardPage';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
    event: state.event,
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
    loadEventIfNeed: (id) => {
      dispatch(loadEventIfNeed(id));
    },
    loadRelationship: (id) => {
      dispatch(loadRelationship(id));
    },
    loadContext: (id) => {
      dispatch(loadContext(id));
    }
  };
}

const EventDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDashboardPage);

export default EventDashboardPageContainer;
