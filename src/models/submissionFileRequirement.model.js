import mongoose, { Schema } from 'mongoose';

/** @@ Submission file requirement adaptation
 * @ Description: wraps a common file requirement
 *
 * @ Log
 * Maradona Morais '2018-01-26 14:19': First definition
 */
const submissionFileRequirementSchema = new Schema({
  fileRequirement: { // Wrapped file requirement ID
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  fileType: { // system identification of file (original, anonymous...)
    type: String,
    required: true,
  },
});

const submissionFileRequirementModel = mongoose.model('SubmitionFileRequirement', submissionFileRequirementSchema);
export { submissionFileRequirementSchema };
export default submissionFileRequirementModel;
