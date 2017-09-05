import mongoose, { Schema } from 'mongoose';

/**
 * Field Model
 *
 * Represents a value obtained from user input forms. Needs a reference to a fieldRequest,
 * that specifys the type of value and the description of the field
 *
 * Maradona Morais '2017-08-28 22:12': Create field model
 */

const fieldSchema = new Schema({
  value: { // The stored value for a field request
    type: Schema.Types.Mixed,
    required: true,
  },
  request: { // The request that originated the field filling
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'FieldRequest',
  },
});

const fieldModel = mongoose.model('Field', fieldSchema);
export { fieldSchema };
export default fieldModel;
