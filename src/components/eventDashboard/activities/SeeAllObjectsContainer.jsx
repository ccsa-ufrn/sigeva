import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadAllObjects, setListToPrint, setPresence, enroll, exit, emitCertificate } from '../../../actions/activities';
import { loadEnrollments } from '../../../actions/report';

const mapStateToProps = state => {
  return {
    allObjects: state.activities.allObjects,
    listOfPresence: state.activities.listOfPresence,
    listOfEnrollments: state.report.enrollments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllObjects: (entitySlug) => {
      dispatch(loadAllObjects(entitySlug));
    },
    setListToPrint: (ofEnrollments) => {
      dispatch(setListToPrint(ofEnrollments));
    },
    emitCertificate: (entitySlug, objectId, type) => {
      dispatch(emitCertificate(entitySlug, objectId, type));
    },
    setPresence: (entitySlug, presence) => {
      dispatch(setPresence(entitySlug, presence));
    },
    loadEnrollments: () => {
      dispatch(loadEnrollments());
    },
    enroll: (entitySlug, objectId) => {
      dispatch(enroll(entitySlug, objectId));
    },
    exit: (entitySlug, objectId) => {
      dispatch(exit(entitySlug, objectId));
    }
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
