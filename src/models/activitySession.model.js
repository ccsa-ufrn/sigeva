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
  // We need these now because of the first Seminario, that had only date and shift
  date: {
    type: Date,
    default: undefined,
  },
  shift: {
    type: Number,
    default: undefined,
  },
});

const activitySessionModel = mongoose.model('ActivitySession', activitySessionSchema);

export { activitySessionSchema };
export default activitySessionModel;
