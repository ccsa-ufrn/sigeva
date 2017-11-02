import { connect } from 'react-redux';
import { loadEventIfNeed } from '../../actions/event';
import EventPage from './EventPage';

const mapStateToProps = state => {
  return {
    event: state.event,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEventIfNeed: (id) => {
      dispatch(loadEventIfNeed(id));
    }
  };
}

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventPage);

export default EventPageContainer;
