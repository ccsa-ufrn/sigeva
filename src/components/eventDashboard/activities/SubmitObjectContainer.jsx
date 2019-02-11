import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { loadUserIfNeed } from '../../../actions/userSession';
import { submitObject } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    activities: state.activities,
    event: state.event,
    userSession: state.userSession,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserIfNeed: () => {
      dispatch(loadUserIfNeed());
    },
    submitObject: (entity, data, confirmationEmail) => {
      dispatch(submitObject(entity, data, confirmationEmail));
    }
  };
};

const SubmitObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitObject);

export default SubmitObjectContainer;
