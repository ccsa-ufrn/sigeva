import mongoose, { Schema } from 'mongoose';

/** @@ Relationship Model
 * @ Description: Represents a relation of a user, with multiples (at least 1) role, with a event.
 *
 * Mongoose Models documentation: http://mongoosejs.com/docs/models.html
 *
 * @ Log
 * Maradona Morais '2017-10-25 13:01': First definition
 */

const relationshipSchema = new Schema({
  user: { // Reference to user
    type: Schema.Types.ObjectId,
    required: true,
  },
  ofRoles: { // Array reference to event's roles ID
    type: [Schema.Types.ObjectId],
    required: true,
  },
  cert: {
    type: String,
    default: null,
  },
});

const relationshipModel = mongoose.model('Relationship', relationshipSchema);
export { relationshipSchema };
export default relationshipModel;
