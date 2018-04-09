import mongoose, { Schema } from 'mongoose';

const activitySessionSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
  },
  entity: {
    type: Schema.Types.ObjectId,
  },
  date: Date,
  shift: Number, // 0 - Manhã; 1 - Tarde; 2 - Noite
});

const activitySessionModel = mongoose.model('ActivitySession', activitySessionSchema);

export { activitySessionSchema };
export default activitySessionModel;
