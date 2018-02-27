import mongoose, { Schema } from 'mongoose';

/** Thematic Group Model
 * Defines a thematic group
 *
 * @ Log
 * Maradona Morais '2017-01-08 17:03' << First definition
 */

const thematicGroupSchema = new Schema({
  name: { // Thematic group's name
    type: String,
    required: true,
  },
  description: { // Thematic group's description
    type: String,
  },
  area: { // Area's ID
    type: mongoose.SchemaTypes.ObjectId,
  },
  coordinators: { // Coordinators list
    type: [mongoose.SchemaTypes.ObjectId],
  },
});

const thematicGroupModel = mongoose.model('thematicGroup', thematicGroupSchema);
export { thematicGroupSchema };
export default thematicGroupModel;
