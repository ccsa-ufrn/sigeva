import fieldModel from '../../models/field.model';
import FieldRequest from '../fieldRequest/FieldRequest';
import async from 'async';

/**
 * Parses a field request to a MongoDB friendly request. E.g.: 'name,password,email' => 'name email'
 */
const parseFields = (fields) => {
		let fieldsStr = '';
		const fieldsArray = fields.split(',');
		fieldsArray.forEach((f) => {
			if (f != 'password') {
				fieldsStr = fieldsStr.concat(f);
				fieldsStr = fieldsStr.concat(' ');
			}
		});
		return fieldsStr;

};

/**
 * Formats a User, getting the fieldRequest info and
 * extracting only required fields
 */
const formatUserFields = (userObject_, fields_) => {
	let userFields = userObject_.ofFields;
	var userFieldsParsed = [];

	// We async operations, so lets return as a Promise
	return new Promise((resolve, reject)=>{
		// For each user.ofFields I need to see into its fieldRequest to know specifications about the field
		async.eachOfSeries(userFields, (field, key, callback)=>{
			// Create a FieldRequest and load it by ID
			let fieldRequest = new FieldRequest();
			fieldRequest.loadById(field.request).then(()=>{
				let fieldRequestData = fieldRequest.getData(); // Get formated fieldRequest data
				fieldRequestData.value = field.value; // Increase value to fieldRequestData
				if (fields_.includes(fieldRequestData.name)) // If the fieldRequest is in the selected by fields_
					userFieldsParsed.push(fieldRequestData); // Can send it to return, by appending to parseds fields
				callback();
			}).catch(reject);
		}, ()=> {
			resolve(userFieldsParsed); // Finnaly, send it back
		});
	});
};

/**
 * Validates a email address
 */
const isEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
};

/**
 * Validates a password field
 */
const isPassword = (password) => {
	password = password.trim();
	if (password.length <= 5) return false;
	return true;
};

/**
 * Creates a new Field Model instace storing a value and a request reference
 */
const createField = (fieldValue_, fieldRequestId_)=> {
	return new fieldModel({value: fieldValue_, request: fieldRequestId_});
};

export {parseFields, formatUserFields, isEmail, isPassword, createField};
