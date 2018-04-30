import { connect } from 'react-redux';

import SeeEnrollments from './SeeEnrollments';
import { loadEnrollments, loadUser, clearUser } from '../../../actions/report';

const mapStateToProps = state => {
  return {
    enrollments: state.report.enrollments,
    selectedUser: state.report.selectedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEnrollments: () => {
      dispatch(loadEnrollments());
    },
    loadUser: (uId) => {
      dispatch(loadUser(uId));
    },
    clearUser: () => {
      dispatch(clearUser());
    },
  };
}

const SeeEnrollmentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeEnrollments);

export default SeeEnrollmentsContainer;
