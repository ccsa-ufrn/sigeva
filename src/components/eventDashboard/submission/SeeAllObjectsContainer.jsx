import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadThematicGroups } from '../../../actions/thematicGroups';
import { loadAllObjects, changeObjectState, emitCertificate, setObjectToEdit, editObject, deleteObject } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
    thematicGroups: state.thematicGroups.thematicGroups,
    listOfEnrollments: state.report.enrollments,
    submission: state.submission,
    eventId: state.event.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllObjects: (entitySlug) => {
      dispatch(loadAllObjects(entitySlug));
    },
    changeObjectState: (entitySlug, objectId, newState) => {
      dispatch(changeObjectState(entitySlug, objectId, newState));
    },
    emitCertificate: (entitySlug, objectId, type) => {
      dispatch(emitCertificate(entitySlug, objectId, type));
    },
    setObjectToEdit: (object) => {
      dispatch(setObjectToEdit(object));
    },
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
    },
    editObject: (entitySlug, objectState) => {
      dispatch(editObject(entitySlug, objectState));
    },
    deleteObject: (entitySlug, objectId) => {
      dispatch(deleteObject(entitySlug, objectId));
    }
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
