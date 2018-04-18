import { connect } from 'react-redux';

import NewPasswordPage from './NewPasswordPage';

import { createNewPassword } from '../../actions/recoverPassword';

const mapStateToProps = (state) => {
  return {
    logged: state.userSession.logged,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewPassword: (newPass, userId, code) => {
      dispatch(createNewPassword(newPass, userId, code));
    },
  };
}

const NewPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPasswordPage);

export default NewPasswordContainer;
