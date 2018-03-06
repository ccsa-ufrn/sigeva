import mongoose, { Schema } from 'mongoose';
import { submissionFileRequirementSchema } from '../models/submissionFileRequirement.model';
import { dateRangeSchema } from '../models/dateRange.model';

/** @@ Submission entity data
 * @ Description: Data of a Submission module entity
 *
 * @ Log
 * Maradona Morais '2018-01-26 14:06': First definition
 */
const submissionEntitySchema = new Schema({
  requirePayment: { // The submission object requires payment
    type: Boolean,
    default: false,
  },
  description: { // Object description
    type: String,
    required: false,
  },
  submissionPeriod: dateRangeSchema, // Date range of submission period
  evaluationPeriod: dateRangeSchema, // Date range for work evaluation
  ofRequiredFiles: [submissionFileRequirementSchema], // Required files
  maxAuthors: { // max number of authors
    type: Number,
    required: true,
    default: 5,
  },
});

const submissionEntityModel = mongoose.model('SubmissionEntity', submissionEntitySchema);
export { submissionEntitySchema };
export default submissionEntityModel;
