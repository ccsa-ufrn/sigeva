import User from './User';

import fieldModel from '../../models/field.model';

import fieldRequestModel from '../../models/fieldRequest.model';
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
 * Formats the user fields, getting the fieldRequest info and
 * extracting only required fields
 */
const formatUserOfFields = (userObject_) => {
	let userOfFields = userObject_.ofFields;
	var userOfFieldsParsed = [];

	// We async operations, so lets return as a Promise
	return new Promise((resolve, reject)=>{
		// For each user.ofFields I need to see into its fieldRequest to know specifications about the field
		async.eachOfSeries(userOfFields, (field, key, callback)=>{
			// Create a FieldRequest and load it by ID
			let fieldRequest = new FieldRequest();
			fieldRequest.loadById(field.request).then(()=>{
				let fieldRequestData = fieldRequest.getData(); // Get formated fieldRequest data
				
				fieldRequestData.value = field.value; // Increase value to fieldRequestData
				userOfFieldsParsed.push(fieldRequestData); // Can send it to return, by appending to parseds fields
			
				callback();
			}).catch(reject);
		}, ()=> {
			resolve(userOfFieldsParsed); // Finnaly, send it back
		});
	});
};

const formatUser = (userObject_, userOfFieldsParsed_) => {
	return {
		name: userObject_.name,
		email: userObject_.email,
		fields: userOfFieldsParsed_
	};
};

/**
 * Validates a email address
 */
const isEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
};

/**
 * Validates a field looking if 
 */
const isBetweenLength = (field, min, max=255) => {
	field = field.trim(); // Removes spaces bars from the borders
	if (field.length < min || field.length > max) return false;
	return true;
};

/**
 * Creates a new Field Model instace storing a value and a request reference
 */
const createField = (fieldValue_, fieldRequestId_)=> {
	return new fieldModel({value: fieldValue_, request: fieldRequestId_});
};

/**
 * Returns a promise that informs if already exists a user using a given email
 * @return promise with resolve(true|false)
 */
const emailAlreadyExists = (email_) => {
	let user = new User();
	return new Promise((resolve, reject) => {
		user.loadByEmail(email_)
		.then(()=>{ resolve(true); })
		.catch(()=>{ resolve(false) });
	});
};

export {parseFields, formatUserOfFields, formatUser, isEmail, isBetweenLength, createField, emailAlreadyExists};
