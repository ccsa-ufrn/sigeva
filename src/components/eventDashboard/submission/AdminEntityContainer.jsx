import { connect } from 'react-redux';

import AdminEntity from './AdminEntity';
import { editEntity } from '../../../actions/submission';

const mapStateToProps = state => {
  return {
    submission: state.submission,
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
