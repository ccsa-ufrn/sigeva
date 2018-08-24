import { connect } from 'react-redux';

import SeeToApproveSubmissions from './SeeToApproveSubmissions';
import { loadObjectsToEvaluate, loadSubmissionEntity, changeObjectState, saveComment } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadObjectsToEvaluate: (entitySlug) => {
      dispatch(loadObjectsToEvaluate(entitySlug));
    },
    loadSubmissionEntity: (entitySlug) => {
      dispatch(loadSubmissionEntity(entitySlug));
    },
    changeObjectState: (entitySlug, objectId, newState) => {
      dispatch(changeObjectState(entitySlug, objectId, newState));
    },
    saveComment: (entitySlug, objectId, newComment) => {
      dispatch(saveComment(entitySlug, objectId, newComment));
    },
  };
}

const SeeToApproveSubmissionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeToApproveSubmissions);

export default SeeToApproveSubmissionsContainer;
