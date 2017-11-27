import { connect } from 'react-redux';

import ApprovePayment from './ApprovePayment';
import { loadToApprovePayments } from '../../../actions/payment';

const mapStateToProps = state => {
  return {
    approvePayment: state.payment.approvePayment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadToApprovePayments: () => {
      dispatch(loadToApprovePayments());
    },
  };
}

const ApprovePaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApprovePayment);

export default ApprovePaymentContainer;
