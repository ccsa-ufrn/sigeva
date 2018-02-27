import mongoose, { Schema } from 'mongoose';

/** @@ Module Entity Model
 * @ Description: Represents a entity in a module.
 *
 * @ Log
 * Maradona Morais '2017-11-8 14:34': First definition
 */

const moduleObjectSchema = new Schema({
  entity: Schema.Types.String,
  data: Schema.Types.Mixed,
});

const moduleObjectModel = mongoose.model('ModuleObject', moduleObjectSchema);

export { moduleObjectSchema };
export default moduleObjectModel;
