import { connect } from 'react-redux';
import CustomCertModule from './CustomCertModule';

import { createNew, loadCerts, setObjectToEdit, editObject } from '../../../actions/customcert';

const mapStateToProps = state => {
  return {
    certs: state.customcert.certs,
    objectToEdit: state.customcert.objectToEdit,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNew: (text) => {
      dispatch(createNew(text));
    },
    loadCerts: () => {
      dispatch(loadCerts());
    },
    setObjectToEdit: (objectToEdit) => {
      dispatch(setObjectToEdit(objectToEdit));
    },
    editObject: (objectToEdit) => {
      dispatch(editObject(objectToEdit));
    },
  };
}

const CustomCertModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomCertModule);

export default CustomCertModuleContainer;
