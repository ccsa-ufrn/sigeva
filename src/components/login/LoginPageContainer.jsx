import { connect } from 'react-redux';

import LoginPage from './LoginPage';

const mapStateToProps = (state) => {
  return {
    logged: state.userSession.logged,
  }
}

const LoginPageContainer = connect(
  mapStateToProps
)(LoginPage);

export default LoginPageContainer;
