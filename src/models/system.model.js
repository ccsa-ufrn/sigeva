import mongoose, {Schema} from 'mongoose';

/** System Model
 * Defines configurations about the system, such as register fields resquested
 *
 * Log
 * Maradona Morais '2017-08-25 14:02': First definition
 */

const systemSchema = new Schema({
	name: { // Representative name of configuration
		type: String,
		unique: true
	},
	data: Schema.Types.Mixed // Data for the configuration
});

const systemModel = mongoose.model('System', systemSchema);
export {systemSchema};
export default systemModel;
