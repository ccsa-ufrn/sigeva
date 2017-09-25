import { connect } from 'react-redux';

import { changeFieldValue, createField, fetchRegisterFields, handleRegisterFieldChange, submitRegister } from '../../actions/register';
import RegisterPage from './RegisterPage';

const mapStateToProps = state => {
  return state.register;
};

const mapDispatchToProps = dispatch => {
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
  mapDispatchToProps
)(RegisterPage);

export default RegisterContainer;
