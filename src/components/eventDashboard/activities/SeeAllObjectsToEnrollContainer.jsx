import { connect } from 'react-redux';

import SeeAllObjectsToEnroll from './SeeAllObjectsToEnroll';
import { loadObjects, enroll, exit } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    allObjectsToEnroll: state.activities.allObjectsToEnroll,
    allObjectsUserEnrolled: state.activities.allObjectsUserEnrolled,
    listOfEnrolledSessions: state.activities.listOfEnrolledSessions,
    userSession: state.userSession,
    activities: state.activities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadObjects: (entitySlug, userId) => {
      dispatch(loadObjects(entitySlug, userId));
    },
    enroll: (entitySlug, objectId) => {
      dispatch(enroll(entitySlug, objectId));
    },
    exit: (entitySlug, objectId) => {
      dispatch(exit(entitySlug, objectId));
    }
  };
};

const SeeAllObjectsToEnrollContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjectsToEnroll);

export default SeeAllObjectsToEnrollContainer;
