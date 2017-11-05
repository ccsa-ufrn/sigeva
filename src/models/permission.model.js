import mongoose, { Schema } from 'mongoose';

/** @@ Permission Model
 * @ Description: Describes a permission to act in the system based on roles
 *
 * @ Log:
 * Maradona Morais '2017-11-04' >> First definition
 */

const permissionSchema = new Schema({
  name: { // Human readable permission name
    type: String,
    required: true,
  },
  action: { // Permission action identification
    type: String,
    required: true,
  },
  entity: {
    type: Schema.Types.ObjectId, // Object reference to entity that the permission is relacted to
  },
  ofRoles: [Schema.Types.ObjectId], // Array of roles reference that the permission is relacted to
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { permissionSchema };
