import { connect } from 'react-redux';
import { loadUserIfNeed } from '../../actions/userSession';
import { enrollUser } from '../../actions/event';
import InscriptionBoard from './InscriptionBoard';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
    event: state.event,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserIfNeed: () => {
      dispatch(loadUserIfNeed());
    },
    submitEnroll: (role) => {
      dispatch(enrollUser(role));
    }
  };
}

const InscriptionBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InscriptionBoard);

export default InscriptionBoardContainer;
