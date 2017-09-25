import { connect } from 'react-redux';

import { doingLogin, didLoginWithError, didLoginWithFailure, didLoginWithSuccess, submitLogin, handleLoginFieldChange } from '../../actions/login';
import LoginBoard from './LoginBoard';

const mapStateToProps = state => {
  return state.login;
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (event, fields) => {
      dispatch(submitLogin(event, fields));
    },
    handleChange: (fieldName, value) => {
      dispatch(handleLoginFieldChange(fieldName, value));
    }
  };
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBoard);

export default LoginContainer;
