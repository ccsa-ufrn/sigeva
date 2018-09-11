import mongoose, { Schema } from 'mongoose';

const activitySessionSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
  },
  entity: {
    type: Schema.Types.ObjectId,
  },
  initialDate: Date,
  finalDate: Date,
});

const activitySessionModel = mongoose.model('ActivitySession', activitySessionSchema);

export { activitySessionSchema };
export default activitySessionModel;
