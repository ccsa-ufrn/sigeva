import mongoose, { Schema } from 'mongoose';

const submissionObjectSchema = new Schema({
  title: String,
  abstract: String,
  keywords: String,
  thematicGroup: Schema.Types.ObjectId,
  authors: [Schema.Types.ObjectId],
  files: [Schema.Types.ObjectId],
  state: {
    type: String,
    default: 'waiting_evaluation', // waiting_evaluation, rejected, approved, present
  },
});

const submissionObjectModel = mongoose.model('SubmissionObject', submissionObjectSchema);

export { submissionObjectSchema };
export default submissionObjectModel;
