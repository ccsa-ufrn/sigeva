import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadAllObjects, changeObjectState, emitCertificate } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    allObjects: state.submission.allObjects,
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
    }
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
