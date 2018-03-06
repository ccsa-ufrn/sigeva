import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { loadSubmissionEntity, submitObject } from '../../../actions/submission';
import { loadThematicGroups } from '../../../actions/thematicGroups';
import { loadUserIfNeed } from '../../../actions/userSession';

const mapStateToProps = state => {
  return {
    submission: state.submission,
    thematicGroups: state.thematicGroups.thematicGroups,
    payment: state.payment,
    eventId: state.event.id,
    userSession: state.userSession,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubmissionEntity: (entity) => {
      dispatch(loadSubmissionEntity(entity));
    },
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
    },
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
