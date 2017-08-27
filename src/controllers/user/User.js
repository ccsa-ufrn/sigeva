import userDAO from './UserDAO'
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
		let fixedFields = ["name", "email", "password"];

		return new Promise((resolve, reject)=>{
			// Validate fixed data
			fixedFields.forEach((field) => {
				if (data[field])
					this.userObject[field] = data[field];
				else
					reject({error: "Informe todos os campos obrigatórios"});
			});

			// TODO Validade fields defined in configuration
			// Formats user before return (preserving sensible data)
			resolve(UserHelper.formatUser(this.userObject, fixedFields));
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
