import mongoose, { Schema } from 'mongoose';

const submissionObjectSchema = new Schema({
  title: String,
  abstract: String,
  keywords: String,
  comment: {
    type: String,
    default: '',
  },
  thematicGroup: Schema.Types.ObjectId,
  authors: [Schema.Types.ObjectId],
  files: [Schema.Types.ObjectId],
  state: {
    type: String,
    default: 'waiting_evaluation', // waiting_evaluation, rejected, approved, present
  },
  cert: {
    type: String,
    default: null,
  },
});

const submissionObjectModel = mongoose.model('SubmissionObject', submissionObjectSchema);

export { submissionObjectSchema };
export default submissionObjectModel;
