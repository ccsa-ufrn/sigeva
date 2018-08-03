import { connect } from 'react-redux';

import AdminEntity from './AdminEntity';
import { editEntity } from '../../../actions/activities';

const mapStateToProps = state => {
  return {
    activities: state.activities,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editEntity: (entity, stateObject) => {
          dispatch(editEntity(entity, stateObject));
        },
    };
};

const AdminEntityContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminEntity);
export default AdminEntityContainer;
