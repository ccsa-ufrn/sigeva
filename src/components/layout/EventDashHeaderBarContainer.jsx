import { connect } from 'react-redux';
import EventDashHeaderBar from './EventDashHeaderBar';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
  };
};

const EventDashHeaderBarContainer = connect(
  mapStateToProps
)(EventDashHeaderBar);

export default EventDashHeaderBarContainer;
