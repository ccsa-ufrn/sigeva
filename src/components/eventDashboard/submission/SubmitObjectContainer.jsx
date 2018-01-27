import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { loadSubmissionEntity } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
    payment: state.payment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubmissionEntity: (entity) => {
      dispatch(loadSubmissionEntity(entity));
    },
  };
};

const SubmitObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitObject);

export default SubmitObjectContainer;
