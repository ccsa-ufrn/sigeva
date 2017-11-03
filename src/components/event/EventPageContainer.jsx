import { connect } from 'react-redux';
import { loadEventIfNeed, loadEventRoles, loadRelationship } from '../../actions/event';
import EventPage from './EventPage';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
    event: state.event,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEventIfNeed: (id) => {
      dispatch(loadEventIfNeed(id));
    },
    loadEventRoles: (id) => {
      dispatch(loadEventRoles(id));
    },
    loadRelationship: (id) => {
      dispatch(loadRelationship(id));
    },
  };
}

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventPage);

export default EventPageContainer;
