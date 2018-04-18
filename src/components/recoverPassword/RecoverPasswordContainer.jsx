import { connect } from 'react-redux';

import RecoverPasswordPage from './RecoverPasswordPage';
import { requirePasswordRecovering } from '../../actions/recoverPassword';

const mapStateToProps = (state) => {
  return {
    logged: state.userSession.logged,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requirePasswordRecovering: (email) => {
      dispatch(requirePasswordRecovering(email));
    },
  };
}

const RecoverPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecoverPasswordPage);

export default RecoverPasswordContainer;
