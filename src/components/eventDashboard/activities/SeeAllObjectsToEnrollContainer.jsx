import { connect } from 'react-redux';

import SeeAllObjectsToEnroll from './SeeAllObjectsToEnroll';
import { loadThematicGroups } from '../../../actions/thematicGroups';
import { loadObjects, enroll, exit } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    allObjectsToEnroll: state.activities.allObjectsToEnroll,
    allObjectsUserEnrolled: state.activities.allObjectsUserEnrolled,
    listOfEnrolledSessions: state.activities.listOfEnrolledSessions,
    userSession: state.userSession,
    thematicGroups: state.thematicGroups,
    activities: state.activities,
    payment: state.payment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadObjects: (entitySlug, userId) => {
      dispatch(loadObjects(entitySlug, userId));
    },
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
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
