import { connect } from 'react-redux';

import ActivitiesModule from './ActivitiesModule';
import { loadActivitiesEntity } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadActivitiesEntity: (entity) => {
      dispatch(loadActivitiesEntity(entity));
    },
  };
};

const ActivityModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivitiesModule);
export default ActivityModuleContainer;
