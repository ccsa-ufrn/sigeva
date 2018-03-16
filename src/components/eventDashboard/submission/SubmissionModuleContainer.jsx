import { connect } from 'react-redux';

import SubmissionModule from './SubmissionModule';
import { loadSubmissionEntity, loadObjectsToEvaluate } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubmissionEntity: (entity) => {
      dispatch(loadSubmissionEntity(entity));
    },
    loadObjectsToEvaluate: (entitySlug) => {
      dispatch(loadObjectsToEvaluate(entitySlug));
    },
  };
};

const SubmissionModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmissionModule);
export default SubmissionModuleContainer;
