import { connect } from 'react-redux';

import SeeToApproveSubmissions from './SeeToApproveSubmissions';
import { loadToApproveSubmission, approveSubmission, rejectSubmission } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadToApproveSubmission: (entitySlug) => {
      dispatch(loadToApproveSubmission(entitySlug));
    },
    approveSubmission: (objectId, entitySlug) => {
      dispatch(approveSubmission(objectId));
    },
    rejectSubmission: (objectId, entitySlug) => {
      dispatch(rejectSubmission(objectId));
    }
  };
}

const SeeToApproveSubmissionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeToApproveSubmissions);

export default SeeToApproveSubmissionsContainer;
