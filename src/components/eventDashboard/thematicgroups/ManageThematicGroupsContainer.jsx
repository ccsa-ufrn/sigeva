import { connect } from 'react-redux';

import ManageThematicGroups from './ManageThematicGroups';
import { loadThematicGroupsAreasAreas } from '../../../actions/thematicGroupsAreas';
import { loadThematicGroups, createThematicGroup } from '../../../actions/thematicGroups';

const mapStateToProps = state => {
  return {
    thematicGroupsAreas: state.thematicGroupsAreas,
    thematicGroups: state.thematicGroups,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadThematicGroupsAreasAreas: () => {
      dispatch(loadThematicGroupsAreasAreas());
    },
    loadThematicGroups: () => {
      dispatch(loadThematicGroups());
    },
    createThematicGroup: (data) => {
      dispatch(createThematicGroup(data));
    }
  };
};

const ManageThematicGroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageThematicGroups);

export default ManageThematicGroupsContainer;
