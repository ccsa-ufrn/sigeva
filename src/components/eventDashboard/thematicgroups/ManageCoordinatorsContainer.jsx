import { connect } from 'react-redux';

import ManageCoordinators from './ManageCoordinators';
import { loadThematicGroups, updateThematicGroupCoordinators } from '../../../actions/thematicGroups';

const mapStateToProps = state => {
  return {
    thematicGroups: state.thematicGroups,
    eventId: state.event.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
    },
    updateThematicGroupCoordinators: (tgId, coordinators) => {
      dispatch(updateThematicGroupCoordinators(tgId, coordinators));
    },
  };
};

const ManageCoordinatorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCoordinators);

export default ManageCoordinatorsContainer;
