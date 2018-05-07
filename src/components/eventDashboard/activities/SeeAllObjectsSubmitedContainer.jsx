import { connect } from 'react-redux';

import SeeAllObjectsSubmited from './SeeAllObjectsSubmited';
import { loadAllObjectsSubmited, setListToPrint } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
    allObjectsSubmited: state.activities.allObjectsSubmited, 
    listOfPresence: state.activities.listOfPresence,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllObjectsSubmited: (entitySlug, userId) => {
      dispatch(loadAllObjectsSubmited(entitySlug, userId));
    },
    setListToPrint: (ofEnrollments) => {
      dispatch(setListToPrint(ofEnrollments));
    },
  };
};

const SeeAllObjectsSubmitedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllObjectsSubmited);

export default SeeAllObjectsSubmitedContainer;
