import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadAllObjects } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    allObjects: state.activities.allObjects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllObjects: (entitySlug) => {
      dispatch(loadAllObjects(entitySlug));
    },
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
