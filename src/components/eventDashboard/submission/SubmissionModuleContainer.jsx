import { connect } from 'react-redux';

import SubmissionModule from './SubmissionModule';
import { loadSubmissionEntity } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubmissionEntity: (entity) => {
      dispatch(loadSubmissionEntity(entity));
    },
  };
};

const SubmissionModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmissionModule);
export default SubmissionModuleContainer;
