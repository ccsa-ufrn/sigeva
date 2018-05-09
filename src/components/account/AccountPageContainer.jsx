import { connect } from 'react-redux';

import AccountPage from './AccountPage';

const mapStateToProps = (state) => {
  return {
    logged: state.userSession.logged,
    user: state.userSession.logged_user,
    register: state.register,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const AccountPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountPage);

export default AccountPageContainer;
