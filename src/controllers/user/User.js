import userDAO from './UserDAO'
import System from '../system/System';
import * as UserHelper from './UserHelper'

/** User
 * Stores and manipulates User Database Object
 */
export default class {
	/**
	 * Initialize a User instance creating a userDAO and requesting a empty Object.
	 */
	constructor() {
		this.DAO = new userDAO();
		this.userObject = this.DAO.createObject();
	}

	/**
	 * Validate and sets user's informations
	 * @param data set of fields to load
	 * @return parsed user fields are ok, error message otherwise.
	 */
	setData(data) {
		var system = new System();

		return new Promise((resolve, reject)=> {
			// TODO All fields must be validate before saved
			system.getRegisterFieldRequests()
			.then((fieldRequests)=>{
				fieldRequests.forEach((fieldReq)=>{
					if (data[fieldReq.name]) { // The body.field with that name exists
						console.log(fieldReq.readableName + " = " + data[fieldReq.name]);
						// TODO if the field is a password it must be encrypted
						// TODO Create a field in ofFields with ref to fieldReq._id
					} else { // The body.field dont exists
						if (fieldReq.required) // It's is required to make a register
							reject({error: "Campos obrigatórios não preenchidos"});
							// TODO Adds in a array of errors to reject
					}
				});
				resolve({stub: true});
				// TODO Use the UserHelper to format the user after return it
				//UserHelper.formatUser(this.userObject, fields)
			}).catch(reject);
		});
	}

	// TODO: Maybe it is not this way
	loadById(objectId_) {
		// Loads the .userObject with a User Database Object searched by passed ID
	}

	setFields(fields_) {
		// Recieves a Array of fixed fields, with values to: 'name', 'email', 'password'
	}

	// TODO: Maybe it is not this way
	authorize(email_, password_) {
		// Checks if the user authentication credentials are valids, must return a boolean (maybe)
	}

	store() {
		this.DAO.insertUser(this.userObject);
		// If is a new user 'store()' must call .insertUser from DAO
		// If is a old user 'store()' must call .updateUser from DAO
	}

}
