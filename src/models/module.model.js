import mongoose, { Schema } from 'mongoose';
import { permissionSchema } from './permission.model';

/** @@ Module Model
 * @ Description: Module represents the services offered by a event
 *
 * Please read: /docs/modulo.br.md (in Portuguese)
 *
 * @ Log:
 * Maradona Morais '2017-11-04 18:13' >> First definition
 */

const moduleSchema = new Schema({
  name: { // Human readable title for the event (E.g: Atividades)
    type: String,
    required: true,
  },
  slug: { // Module identification URL transportable
    type: String,
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  ofEntities: [Schema.Types.Mixed],
  ofPermissions: [permissionSchema],
  storage: {
    type: Schema.Types.Mixed,
  },
  config: {
    type: Schema.Types.Mixed,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const moduleModel = mongoose.model('Module', moduleSchema);
export { moduleSchema };
export default moduleModel;
