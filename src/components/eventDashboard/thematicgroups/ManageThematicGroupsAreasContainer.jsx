import { connect } from 'react-redux';

import ManageThematicGroupsAreas from './ManageThematicGroupsAreas';
import { loadThematicGroupsAreasAreas } from '../../../actions/thematicGroupsAreas';

const mapStateToProps = state => {
  return {
    thematicGroupsAreas: state.thematicGroupsAreas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadThematicGroupsAreasAreas: () => {
      dispatch(loadThematicGroupsAreasAreas());
    },
  };
};

const ManageThematicGroupsAreasContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageThematicGroupsAreas);

export default ManageThematicGroupsAreasContainer;
