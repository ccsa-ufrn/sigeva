import mongoose, { Schema } from 'mongoose';

/** Thematic Group Area
 * Defines a thematic group area subdocument of Thematic Group Module
 *
 * @ Log
 * Maradona Morais '2017-01-08 17:03' << First definition
 */

const thematicGroupAreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.SchemaTypes.ObjectId,
  },
});

const thematicGroupAreaModel = mongoose.model('thematicGroupArea', thematicGroupAreaSchema);
export { thematicGroupAreaSchema };
export default thematicGroupAreaModel;
