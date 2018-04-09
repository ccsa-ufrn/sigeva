import mongoose, { Schema } from 'mongoose';

const activityConsolidationSchema = new Schema({
  sessions: [Schema.Types.ObjectId],
  location: String,
  vacancies: Number,
});

const activityConsolidationModel = mongoose.model('ActivityConsolidation', activityConsolidationSchema);

export { activityConsolidationSchema };
export default activityConsolidationModel;
