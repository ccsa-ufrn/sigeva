import { connect } from 'react-redux';

import SeeAllObjectsEnrolled from './SeeAllObjectsEnrolled';
import { loadObjects, exit } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    allObjectsUserEnrolled: state.activities.allObjectsUserEnrolled,
    allObjectsToEnroll: state.activities.allObjectsToEnroll,
    userSession: state.userSession,
    activities: state.activities,
    listOfEnrolledSessions: state.activities.listOfEnrolledSessions,
    payment: state.payment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadObjects: (entitySlug, userId) => {
      dispatch(loadObjects(entitySlug, userId));
    },
    exit: (entitySlug, objectId) => {
      dispatch(exit(entitySlug, objectId));
    }
  };
};

const SeeAllObjectsEnrolledContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjectsEnrolled);

export default SeeAllObjectsEnrolledContainer;
