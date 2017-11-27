import mongoose, { Schema } from 'mongoose';

const paymentReceiptSchema = new Schema({
  user: { // Reference to the user
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  file: { // Reference to the receipt file
    type: Schema.Types.ObjectId,
    ref: 'File',
  },
  status: { // 'to_approve' | 'approved' | 'rejected'
    type: String,
    default: 'to_approve',
  },
  type: { // 'receipt' of 'free'
    type: String,
    default: 'receipt',
  },
});

const paymentReceiptModel = mongoose.model('PaymentReceipt', paymentReceiptSchema);
export { paymentReceiptSchema };
export default paymentReceiptModel;
