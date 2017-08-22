import userDAO from './UserDAO'

/** User
 * Stores and manipulates User Database Object
 */
export default class {
	/**
	 * Initialize a User instance creating a userDAO and requesting a empty Object.
	 */
	constructor() {
		this.DAO = new userDAO();
		this.userObject = DAO.createObject();
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
		// If is a new user 'store()' must call .insertUser from DAO
		// If is a old user 'store()' must call .updateUser from DAO
	}
	
}
