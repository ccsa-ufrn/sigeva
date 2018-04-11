import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema({
  user: Schema.Types.ObjectId,
  present: Boolean,
});

const enrollmentModel = mongoose.model('Enrollment', enrollmentSchema);

export { enrollmentSchema };
export default enrollmentModel;
