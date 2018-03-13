import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { loadUserIfNeed } from '../../../actions/userSession';
import { submitObject } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    activities: state.activities,
    eventId: state.event.id,
    userSession: state.userSession,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserIfNeed: () => {
      dispatch(loadUserIfNeed());
    },
    submitObject: (entity, data) => {
      dispatch(submitObject(entity, data));
    }
  };
};

const SubmitObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitObject);

export default SubmitObjectContainer;
