import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadAllObjects, setListToPrint } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    allObjects: state.activities.allObjects,
    listOfPresence: state.activities.listOfPresence,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllObjects: (entitySlug) => {
      dispatch(loadAllObjects(entitySlug));
    },
    setListToPrint: (ofEnrollments) => {
      dispatch(setListToPrint(ofEnrollments));
    }
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
