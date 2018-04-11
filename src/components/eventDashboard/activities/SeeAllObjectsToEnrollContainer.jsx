import { connect } from 'react-redux';

import SeeAllObjectsToEnroll from './SeeAllObjectsToEnroll';
import { loadAllObjectsToEnroll, enroll, exit } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    allObjectsToEnroll: state.activities.allObjectsToEnroll,
    userSession: state.userSession,
    activities: state.activities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllObjectsToEnroll: (entitySlug) => {
      dispatch(loadAllObjectsToEnroll(entitySlug));
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
