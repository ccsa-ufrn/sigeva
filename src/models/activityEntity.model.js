import mongoose, { Schema } from 'mongoose';
import { dateRangeSchema } from '../models/dateRange.model';

const activityEntitySchema = new Schema({
  requirePayment: { // para inscrição
    type: Boolean,
    default: false,
  },
  maxProposersUsers: {
    type: Number,
    default: 0, // Infinito
  },
  proposalPeriod: dateRangeSchema,
  enrollmentPeriod: dateRangeSchema,
  ofProposalRequiredFiles: [mongoose.SchemaTypes.ObjectId],
  ofProposalRequiredFields: [mongoose.SchemaTypes.ObjectId],
});

const activityEntityModel = mongoose.model('ActivityEntity', activityEntitySchema);

export { activityEntitySchema };
export default activityEntityModel;
