import { connect } from 'react-redux';

import ExemptPayment from './ExemptPayment';
import { loadExemptsList, exemptUser } from '../../../actions/payment';

const mapStateToProps = state => {
  return {
    exemptsList: state.payment.exemptsList,
    eventId: state.event.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadExemptsList: () => {
      dispatch(loadExemptsList());
    },
    exemptUser: (userId) => {
      dispatch(exemptUser(userId));
    }
  };
}

const ExemptPaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExemptPayment);

export default ExemptPaymentContainer;
