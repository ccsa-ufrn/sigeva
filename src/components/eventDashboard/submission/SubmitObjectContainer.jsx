import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { loadSubmissionEntity } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubmissionEntity: () => {
      dispatch(loadSubmissionEntity());
    },
  };
};

const SubmitObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitObject);

export default SubmitObjectContainer;
