import mongoose, { Schema } from 'mongoose';

/** @@ Module Entity Model
 * @ Description: Represents a entity in a module.
 *
 * @ Log
 * Maradona Morais '2017-11-7 21:41': First definition
 */
const moduleEntitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
  },
});

const moduleEntityModel = mongoose.model('ModuleEntity', moduleEntitySchema);
export { moduleEntitySchema };
export default moduleEntityModel;
