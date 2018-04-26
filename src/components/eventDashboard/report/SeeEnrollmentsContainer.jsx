import { connect } from 'react-redux';

import SeeEnrollments from './SeeEnrollments';
import { loadEnrollments } from '../../../actions/report';

const mapStateToProps = state => {
  return {
    enrollments: state.report.enrollments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEnrollments: () => {
      dispatch(loadEnrollments());
    },
  };
}

const SeeEnrollmentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeEnrollments);

export default SeeEnrollmentsContainer;
