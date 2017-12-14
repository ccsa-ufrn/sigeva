import { connect } from 'react-redux';
import { loadEventIfNeed, loadEventRoles, loadRelationship } from '../../actions/event';
import EventDetail from './EventDetail';

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

const EventDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDetail);

export default EventDetailContainer;
