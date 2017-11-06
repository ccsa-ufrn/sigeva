import { connect } from 'react-redux';
import { loadEventsBoardIfNeed } from '../../actions/eventsBoard';
import EventsBoard from './EventsBoard';

const mapStateToProps = (state) => {
  return {
    eventsBoard: state.eventsBoard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: () => {
      dispatch(loadEventsBoardIfNeed());
    },
  };
};

const EventsBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsBoard);

export default EventsBoardContainer;
