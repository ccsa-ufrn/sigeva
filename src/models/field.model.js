import mongoose, {Schema} from 'mongoose';

/* @@ Field Model
 *
 * @ Description: Represents a field/information required from user's forms. It can be create by 
 * users or by default
 *
 * It have not a documentation, but is used in User Model
 *
 * @ Log
 * Maradona Morais '2017-08-20': First definition
 */

const fieldSchema = new Schema({
	name: { // Field name "system readable" (e.g.: "lattes-url")
		type: String,
		required: true
	},  // Field name "human readable" (e.g.: "URL do Lattes")
	readableName: {
		type: String,
		required: true
	},
	HTMLtype: String, // HTML fields type (e.g.: "text", "number", "password") Complete list: https://www.w3schools.com/tags/att_input_type.asp
	// TODO Support to <select> element (multiples options)
});

const fieldModel = mongoose.model('Field', fieldSchema);
export fieldSchema;
export default fieldModel;
