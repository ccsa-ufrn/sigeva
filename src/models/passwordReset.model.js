import mongoose, { Schema } from 'mongoose';
/**
 * @@ File Model
 * Represents
 *
 * @ Log
 *Thayrone Dayvid Dos Santos '2017-12-12' >> First definition
 */

const passwordResetSchema = new Schema ({
  User: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  activationCode: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const passwordResetModel = mongoose.model('passwordReset', passwordResetSchema);

export { passwordResetSchema };
export default passwordResetModel;
