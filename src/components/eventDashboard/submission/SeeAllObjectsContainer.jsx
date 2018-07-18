import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadThematicGroups } from '../../../actions/thematicGroups';
import { loadAllObjects, changeObjectState, emitCertificate, setObjectToEdit, editObject } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    allObjects: state.submission.allObjects,
    objectToEdit: state.submission.objectToEdit,
    userSession: state.userSession,
    thematicGroups: state.thematicGroups.thematicGroups,
    submission: state.submission,
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
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
