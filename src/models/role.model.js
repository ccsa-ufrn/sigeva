import mongoose, { Schema } from 'mongoose';

/** @@ Role Model
 *
 * @ Description: A role defines the types of the user relacted to a relationship with a event
 * (see relationship.model)
 *
 * Read the docs to have a full description: /docs/papel.br.md (in portuguese)
 * Mongoose Models documentation: http://mongoosejs.com/docs/models.html
 *
 * @ Log
 * Maradona Morais '2017-10-25 12:14': First definition
 */

const roleSchema = new Schema({
  name: { // The role's name
    type: String,
    required: true,
  },
  description: String, // The role's description
  type: { // The access modifier ('public' or 'private')
    type: String,
    required: true,
    default: 'public',
  },
  editable: { // Indicates if it is a final (created by the system) or variable (created by a user)
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: { // Date of creation of the instance
    type: Date,
    default: Date.now,
  },
  active: { // Tells if the instance is desactivated
    type: Boolean,
    default: true,
  },
});

const roleModel = mongoose.model(roleSchema);
export { roleSchema };
export default roleModel;
