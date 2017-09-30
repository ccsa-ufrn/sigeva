import { connect } from 'react-redux';
import { logoutUserSession } from '../../actions/userSession';
import DashboardHeaderBar from './DashboardHeaderBar';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUserSession());
    },
  };
};

const DashboardHeaderBarContainer = connect(
  null,
  mapDispatchToProps
)(DashboardHeaderBar);

export default DashboardHeaderBarContainer;
