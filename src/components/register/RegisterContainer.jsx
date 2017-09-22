import { connect } from 'react-redux';

import { changeFieldValue, createField, fetchRegisterFields, handleRegisterFieldChange, submitRegister } from '../../actions/register';
import RegisterPage from './RegisterPage';

const mapStateToProps = state => {
  return state.register;
  // {
  //   fields: state.register.fields,
  //   fields_requests: state.register.fields_requests,
  //   fields_loading: state.register.fields_loading,
  //   fields_load_error: state.register.fields_load_error,
  //   register_success: state.register.register_success
  // }
};

const mapDispathToProps = dispatch => {
  return {
    createField: (fieldName, value = '') => {
      dispatch(createField(fieldName, value));
    },
    fetchRegisterFields: () => {
      dispatch(fetchRegisterFields());
    },
    handleChange: (fieldName, value) => {
      dispatch(handleRegisterFieldChange(fieldName, value));
    },
    submit: (event, fields) => {
      dispatch(submitRegister(event, fields));
    }
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispathToProps
)(RegisterPage);

export default RegisterContainer;
