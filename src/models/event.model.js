import mongoose, { Schema } from 'mongoose';
import { dateRangeSchema } from './dateRange.model';
import { roleSchema } from './role.model';
import { relationshipSchema } from './relationship.model';

/* @@ Event Model
 *
 * @ Description: The event type document can be created by a System Administrator (Top Level User).
   Other users relate to events through relationships, defined through roles. Creating an event
   requires association with at least one Event Coordinator.
 *
 * Read the docs to have a full description: /docs/evento.br.md (in portuguese)
 * Mongoose Models documentation: http://mongoosejs.com/docs/models.html
 *
 * @ Log
 * Thayrone Dayvid Dos Santos '2017-08-25 14:12': First definition
 * Maradona Morais '2017-10-28 12:29': Create role, relationships and available fields.
 */

const eventSchema = new Schema({
  name: { // Event name
    type: String,
    required: true,
  },
  subtitle: { // Event theme
    type: String,
    required: true,
  },
  eventPeriod: { // Event Period
    type: dateRangeSchema,
    required: true,
  },
  enrollmentPeriod: { // Event register period
    type: dateRangeSchema,
    required: true,
  },
  // ofRoles uses subdocs Mongoose's feature: http://mongoosejs.com/docs/subdocs.html
  ofRoles: [roleSchema], // Array of event's roles
  ofRelationships: [relationshipSchema], // Relationships with users
  published: { // event availability, it tells if the event must be showed as "active"
    type: Boolean,
    default: false,
  },
  createdAt: { // Creation date
    type: Date,
    default: Date.now,
  },
  active: { // Instance active
    type: Boolean,
    default: true,
  },
});

const eventModel = mongoose.model('Event', eventSchema);
export { eventSchema };
export default eventModel;
