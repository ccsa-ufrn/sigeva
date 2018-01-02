import { connect } from 'react-redux';

import ApprovePayment from './ApprovePayment';
import { loadToApprovePayments, updateReceiptStatus } from '../../../actions/payment';

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
    updateReceiptStatus: (receiptId, newStatus) => {
      dispatch(updateReceiptStatus(receiptId, newStatus));
    },
  };
}

const ApprovePaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApprovePayment);

export default ApprovePaymentContainer;
