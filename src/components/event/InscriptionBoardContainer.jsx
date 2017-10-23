import { connect } from 'react-redux';
import { loadUserIfNeed } from '../../actions/userSession';
import InscriptionBoard from './InscriptionBoard';

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserIfNeed: () => {
      dispatch(loadUserIfNeed());
    }
  };
}

const InscriptionBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InscriptionBoard);

export default InscriptionBoardContainer;
