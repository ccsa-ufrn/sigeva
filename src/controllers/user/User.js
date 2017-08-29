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
	setData(data_) {
		let fixed_fields = ['name', 'password', 'email'];
		var errors = []; // Array of errors

		// Validade fixed fields
		fixed_fields.forEach((field) => {
			if (data_[field]) {
				// Validade name
				if (field == 'name') {
					if (!UserHelper.isBetweenLength(data_[field], 3))
						errors.push({field: field, message: "Valor inválido para " + field});
				}

				// Validate email
				if (field == 'email') {
					if (!UserHelper.isEmail(data_[field]) || !UserHelper.isBetweenLength(data_[field], 3, 65))
						errors.push({field: field, message: "Valor inválido para " + field});
				}

				// Validate password
				if (field == 'password') {
					if (!UserHelper.isBetweenLength(data_[field], 5, 20))
						errors.push({field: field, message: "A senha deve ter entre 5 e 20 caracteres"});
				}

				// Set field in the object
				this.userObject[field] = data_[field].trim();
			} else { // It's a required field, must be received
				errors.push({field: field, message: "É obrigatório preencher " + field});
			}
		});

		var system = new System();

		return new Promise((resolve, reject)=>{
			// Validate user email existence
			UserHelper.emailAlreadyExists(this.userObject.email)
			.then((exists)=>{
				if (exists) {
					errors.push({field: 'email', message: "Já existe uma conta com este endereço de email"});
					reject(errors);
				} else {
					// Validate de configurable fields
					system.getRegisterFieldRequests()
					.then((fieldRequests)=>{
						fieldRequests.forEach((fieldReq)=>{
							if (data_[fieldReq.name]) { // The body.field with that name exists
								// Create a Field and append it in ofFields
								let field = UserHelper.createField(data_[fieldReq.name], fieldReq._id);
								this.userObject.ofFields.push(field);
							} else { // The body.field doesn't exists
								if (fieldReq.required)
									errors.push({field: fieldReq.name, message: "O campo " + fieldReq.readableName.toLowerCase() + " é obrigatório"});
							}
						});

						// Set the common type to the user
						this.userObject.ofTypes.push("common");
						// Final validation
						if (errors.length != 0) {
							reject(errors); // Reject request throwing a set of errors
						} else {
							resolve();
							/*let parsedOfFields = UserHelper.formatUserOfFields(this.userObject);
							resolve(UserHelper.formatUser(this.userObject, parsedOfFields)); // Everything is ok, can return the user */
						}
					});
				}
			}).catch("Ocorreu um erro");
		});
	}

	// TODO: Maybe it is not this way
	loadById(objectId_) {
		// Loads the .userObject with a User Database Object searched by passed ID
	}


	/**
	 * Load user by email
	 * @param email_ email to search for 
	 * @return true if the
	 */
	loadByEmail(email_) {
		var query = userModel.findOne({email: email_});
		query.populate({
			path: 'ofField.request',
			model: fieldRequestModel
		});

		return new Promise((resolve, reject) => {
			this.DAO.executeQuery(query).then((doc)=>{
				if (doc) {
					// Set this user as the required
					this.userObject = doc;
					resolve();
				} else {
					// This user doesn't exists
					reject();
				}
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
				UserHelper.formatUserOfFields(userDoc).
				then((parsedOfFields)=>{
					resolve(UserHelper.formatUser(userDoc, parsedOfFields)); // Everything is ok, can return the user 
				});
			}).catch(reject);
		});
	}

}
