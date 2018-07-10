import { connect } from 'react-redux';
import CustomCertModule from './CustomCertModule';

import { createNew, loadCerts } from '../../../actions/customcert';

const mapStateToProps = state => {
  return {
    certs: state.customcert.certs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNew: (text) => {
      dispatch(createNew(text));
    },
    loadCerts: () => {
      dispatch(loadCerts());
    }
  };
}

const CustomCertModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomCertModule);

export default CustomCertModuleContainer;
