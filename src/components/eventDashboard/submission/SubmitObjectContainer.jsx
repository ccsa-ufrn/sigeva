import { connect } from 'react-redux';

import SubmitObject from './SubmitObject';
import { loadSubmissionEntity } from '../../../actions/submission';
import { loadThematicGroups } from '../../../actions/thematicGroups'

const mapStateToProps = state => {
  return {
    submission: state.submission,
    thematicGroups: state.thematicGroups.thematicGroups,
    payment: state.payment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubmissionEntity: (entity) => {
      dispatch(loadSubmissionEntity(entity));
    },
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
    }
  };
};

const SubmitObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitObject);

export default SubmitObjectContainer;
