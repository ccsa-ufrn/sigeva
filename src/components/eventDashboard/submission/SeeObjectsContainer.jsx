import { connect } from 'react-redux';

import SeeObjects from './SeeObjects';
import { loadUserObjects } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
    listOfEnrollments: state.report.enrollments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserObjects: (entitySlug) => {
      dispatch(loadUserObjects(entitySlug));
    },
  };
};

const SeeObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeObjects);
export default SeeObjectsContainer;
