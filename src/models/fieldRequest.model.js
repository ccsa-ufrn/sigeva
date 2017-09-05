import mongoose, { Schema } from 'mongoose';

/** Field Request Model
 *
 * Description: Represents a request of information from user's forms. It can be created by
 * users or by default
 *
 * It have not a documentation, but is used in Activity
 *
 * Log
 * Maradona Morais '2017-08-20 00:23': First definition
 * Maradona Morais '2017-08-20 14:13': Redefinition + rename 'Field'->'FieldRequirement'
 * Maradona Morais '2017-08-25 12:55': Change model name from 'FieldRequiremnt' to 'FieldRequest'
 */

const fieldRequestSchema = new Schema({
  name: { // Field name "system readable" (e.g.: "lattes-url")
    type: String,
    required: true,
    lowercase: true,
  }, // Field name "human readable" (e.g.: "URL do Lattes")
  readableName: {
    type: String,
    required: true,
  },
  HTMLtype: { // HTML fields type (e.g.: "text", "number", "password") Complete list: https://www.w3schools.com/tags/att_input_type.asp
    type: String,
    required: true,
  },
  editable: { // Tells if user can edit the Request
    type: Boolean,
    default: true,
  },
  required: { // Tells if is a required field
    type: Boolean,
    default: false,
  },
  createdAt: { // Date of creation of the field request
    type: Date,
    default: Date.now,
  },
  destroy: { // Tells if the instance must be deleted from the database in next destroy loop
    type: Boolean,
    default: false,
  },
  // TODO Support to <select> element (multiples options)
});

const fieldRequestModel = mongoose.model('FieldRequest', fieldRequestSchema);
export { fieldRequestSchema };
export default fieldRequestModel;
