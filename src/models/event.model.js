import mongoose, {Schema} from 'mongoose';
import {dateRangeSchema} from './dateRange.model';
import {userSchema} from './user.model';

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
 */

const eventSchema = new Schema ({
	name: { // Event name
        type: String,
        required: true,
        unique: true
    },
	subtitle: { // Event theme
        type: String,
        required: true
    },
	eventPeriod: {  // Event Period
        type: dateRangeSchema,
        required: true
    },
	registerPeriod: { // Event register period
        type: dateRangeSchema,
        required: true
    },
    createdAt: { // Criation date
        type: Date,
        default: Date.now
    },
    userCreator: { // User creattor
        type: userSchema,
        required: true
    },
    active: { // Instance ON
        type: Boolean,
        default: true
    }
	//ofUserRelationships[]: UserRelationship,,
	//ofRoles[]: roles,
	//ofSubevents[]:Subevent,
    //ofMoludes[]:Modules

});

const eventModel = mongoose.model('Event', eventSchema);
export {eventSchema};
export default eventModel;
