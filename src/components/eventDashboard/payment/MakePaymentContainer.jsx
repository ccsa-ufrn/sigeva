import { connect } from 'react-redux';

import MakePayment from './MakePayment';
import { submitReceipt, loadPaymentInfo } from '../../../actions/payment';

const mapStateToProps = state => {
  return {
    payment: state.payment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitReceipt: (fileId) => {
      dispatch(submitReceipt(fileId));
    },
    reloadPaymentInfo: () => {
      dispatch(loadPaymentInfo());
    },
  };
}

const MakePaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakePayment);

export default MakePaymentContainer;
