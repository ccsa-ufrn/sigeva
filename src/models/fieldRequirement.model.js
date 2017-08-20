import mongoose, {Schema} from 'mongoose';

/* @@ Field Requirement Model
 *
 * @ Description: Represents a requiremento of information from user's forms. It can be created by 
 * users or by default
 *
 * It have not a documentation, but is used in Activity
 *
 * @ Log
 * Maradona Morais '2017-08-20 00:23': First definition
 * Maradona Morais '2017-08-20 14:13': Redefinition + rename 'Field'->'FieldRequirement'
 */

const fieldRequirementSchema = new Schema({
	name: { // Field name "system readable" (e.g.: "lattes-url")
		type: String,
		required: true
	},  // Field name "human readable" (e.g.: "URL do Lattes")
	readableName: {
		type: String,
		required: true
	},
	HTMLtype: String // HTML fields type (e.g.: "text", "number", "password") Complete list: https://www.w3schools.com/tags/att_input_type.asp
	// TODO Support to <select> element (multiples options)
});

const fieldRequirementModel = mongoose.model('FieldRequirement', fieldRequirementSchema);
export fieldRequirementSchema;
export default fieldRequirementModel;
