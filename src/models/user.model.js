import mongoose, {Schema} from 'mongoose';

/* @@ User Model
 *
 * @Description: A user is a fundamental piece in the application, its represents actors in the 
 * business logic. There are two kinds of users: Administrator and Comum user.
 *
 * A administrator have privileges over the system, while comum one have privileges over events.
 *
 * Users can be both administrator and comum user, sometimes.
 *
 * Read the docs to have a full description: /docs/user.br.md (in portuguese)
 */

const userSchema = new Schema({
	name: { // User's full name
		type: String,
		required: true
	},
	email: { // User's email
		type: String,
		required: true,
		unique: true,	
		lowercase: true
	},
	emailConfirmation: { // tells if the user's mail was confirmed
		type: Boolean,
		default: false
	},
	password: { // Encrypted user's password
		type: String,
		required: true
	},
	photo: String, // path to user's profile photograph
	ofType: [String], // types of user: Administrator, Comum or both.
	ofField: [Schema.Types.Mixed], // Array of fields that can be defined by a administrator
	// TODO try to define a Field in a mongoose's model
	ofEvents: [Schema.Types.ObjectId], // Array of references to events that the user is enrolled in
	active: { // tells if the account was desactivated
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
