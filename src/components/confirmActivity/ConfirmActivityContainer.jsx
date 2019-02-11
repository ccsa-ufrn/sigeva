import { connect } from 'react-redux';
import ConfirmActivityPage from './ConfirmActivityPage';
import { confirmActivity } from '../../actions/activities';

const mapStateToProps = (state) => {
  return {
    status: state.activities.status,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirmActivity: (eventId, code) => {
      dispatch(confirmActivity(eventId, code));
    },
  };
}

const ConfirmActivityContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmActivityPage);

export default ConfirmActivityContainer;
