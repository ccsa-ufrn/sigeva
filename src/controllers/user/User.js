import userDAO from './UserDAO'
import System from '../system/System';
import * as UserHelper from './UserHelper';

import async from 'async';

import userModel from '../../models/user.model';
import fieldRequestModel from '../../models/fieldRequest.model';

/**
 * User
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
	 * @return parsed user fields | error message.
	 */
	setData(data) {
		var system = new System();

		return new Promise((resolve, reject)=> {
			// TODO All fields must be validate before saved
			var errors = []; // Array of errors
			system.getRegisterFieldRequests()
			.then((fieldRequests)=>{
				fieldRequests.forEach((fieldReq)=>{
					if (data[fieldReq.name]) { // The body.field with that name exists
						// Validate email
						if (fieldReq.name == "email") {
							if (!UserHelper.isEmail(data[fieldReq.name])) {
								errors.push({field: fieldReq.name, message: fieldReq.readableName.toLowerCase() + " inserido não é válido"});
							}
						}

						// Validate password
						if (fieldReq.name == "password") {
							// TODO if the field is a password it must be encrypted
							if (!UserHelper.isPassword(data[fieldReq.name])) {
								errors.push({field: fieldReq.name, message: fieldReq.readableName.toLowerCase() + " não foi preenchida corretamente"});
							}
						}
						// Create a Field that represents a user field
						let field = UserHelper.createField(data[fieldReq.name], fieldReq._id);
						this.userObject.ofFields.push(field);
					} else { // The body.field dont exists
						if (fieldReq.required) // It's is required to make a register
							errors.push({field: fieldReq.name, message: "É obrigatório preencher " + fieldReq.readableName.toLowerCase()});
					}
				});
				// The user have type common
				this.userObject.ofTypes.push("common");

				if (errors.length != 0) {
					reject(errors); // Reject request throwing a set of errors
				} else {
					resolve();
					//let parsedUser =  UserHelper.formatUserFields(this.userObject, ['name', 'email']);
					//resolve(parsedUser);
				}
			}).catch(reject);
		});
	}

	// TODO: Maybe it is not this way
	loadById(objectId_) {
		// Loads the .userObject with a User Database Object searched by passed ID
	}

	/**
	 * Search for a User by email
	 * @param email_ email to search for
	 */
	searchUserByEmail(email_) {
		/* {name: "asds", email: "sads"}
		 */
		var query = userModel.findOne({'ofFields.value': email_});
		query.populate({
			path: 'ofFields.request',
			model: fieldRequestModel
		});

		return new Promise((resolve, reject) => {
			this.DAO.executeQuery(query).then((doc)=>{
				if (doc) {
					doc.ofFields.forEach((field)=> {
						if (field.value == email_ && field.request.name == 'email') {
							resolve(doc);
						}
					});
				}
				resolve(false);
			}).catch(reject);
		});
	}


	setFields(fields_) {
		// Recieves a Array of fixed fields, with values to: 'name', 'email', 'password'
	}

	// TODO: Maybe it is not this way
	authorize(email_, password_) {
		// Checks if the user authentication credentials are valids, must return a boolean (maybe)
	}

	store() {
		return new Promise((resolve, reject)=>{
			this.DAO.insertUser(this.userObject)
			.then((userDoc)=>{
				let parsedUser =  UserHelper.formatUserFields(userDoc, ['name', 'email']);
				parsedUser.then(resolve)
				.catch(reject);
			}).catch(reject);
		});
	}

}
