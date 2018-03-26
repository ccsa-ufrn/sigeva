import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { submitObject, loadObjectsToEvaluate } from '../../../actions/submission';
import { loadThematicGroups } from '../../../actions/thematicGroups';
import { loadUserIfNeed } from '../../../actions/userSession';

const mapStateToProps = state => {
  return {
    submission: state.submission,
    thematicGroups: state.thematicGroups.thematicGroups,
    isTGCoordinator: ((state.submission.objectsToEvaluate.length == 0 ||
      state.submission.objectsToEvaluate.thematicGroups.length == 0 ) ? false : true),
    objectsToEvaluate: state.submission.objectsToEvaluate,
    payment: state.payment,
    eventId: state.event.id,
    userSession: state.userSession,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
    },
    loadUserIfNeed: () => {
      dispatch(loadUserIfNeed());
    },
    submitObject: (entity, data) => {
      dispatch(submitObject(entity, data));
    },
    loadObjectsToEvaluate: (entitySlug) => {
      dispatch(loadObjectsToEvaluate(entitySlug));
    },
  };
};

const SubmitObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitObject);
export default SubmitObjectContainer;
