import { connect } from 'react-redux';

import SeeAllObjects from './SeeAllObjects';
import { loadAllObjects, setListToPrint, setPresence } from '../../../actions/activities';

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
    },
    setPresence: (entitySlug, presence) => {
      dispatch(setPresence(entitySlug, presence));
    }
  };
};

const SeeAllObjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjects);

export default SeeAllObjectsContainer;
