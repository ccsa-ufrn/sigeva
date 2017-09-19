import { connect } from 'react-redux';

import { changeFieldValue, createField, fetchRegisterFields } from '../../actions';
import RegisterPage from './RegisterPage';

const mapStateToProps = state => {
  return {
    fields: state.register.fields,
    fields_requests: state.register.fields_requests,
  }
};

const mapDispathToProps = dispatch => {
  return {
    createField: (fieldName, value = '') => {
      dispatch(createField(fieldName, value));
    },
    fetchRegisterFields: () => {
      dispatch(fetchRegisterFields());
    }
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispathToProps
)(RegisterPage);

export default RegisterContainer;
