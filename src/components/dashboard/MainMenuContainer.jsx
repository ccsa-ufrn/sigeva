import { connect } from 'react-redux';

import MainMenu from './MainMenu';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
  };
};

const MainMenuContainer = connect(
  mapStateToProps,
)(MainMenu);

export default MainMenuContainer;
