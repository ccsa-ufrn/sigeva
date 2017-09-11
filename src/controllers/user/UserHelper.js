import async from 'async';
import bcrypt from 'bcrypt';

import User from './User';

import FieldModel from '../../models/field.model';
import FieldRequest from '../fieldRequest/FieldRequest';

/**
 * Parses a field request to a MongoDB friendly request. E.g.: 'name,password,email' => 'name email'
 */
const parseFields = (fields) => {
  let fieldsStr = '';
  const fieldsArray = fields.split(',');
  fieldsArray.forEach((f) => {
    if (f !== 'password') {
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
  const userOfFields = userObject_.ofFields;
  const userOfFieldsParsed = [];

  // We async operations, so lets return as a Promise
  return new Promise((resolve, reject) => {
    // For each user.ofFields I need to see into its fieldRequest to
    // know specifications about the field
    async.eachOfSeries(userOfFields, (field, key, callback) => {
      // Create a FieldRequest and load it by ID
      const fieldRequest = new FieldRequest();
      fieldRequest.loadById(field.request).then(() => {
        const fieldRequestData = fieldRequest.getData(); // Get formated fieldRequest data

        fieldRequestData.value = field.value; // Increase value to fieldRequestData
        // Can send it to return, by appending to parseds fields
        userOfFieldsParsed.push(fieldRequestData);

        callback();
      }).catch(reject);
    }, () => {
      resolve(userOfFieldsParsed); // Finnaly, send it back
    });
  });
};

const formatUser = (userObject_, userOfFieldsParsed_) => {
  const formated = {
    name: userObject_.name,
    email: userObject_.email,
    fields: userOfFieldsParsed_,
  };
  return formated;
};

/**
 * Validates a email address
 */
const isEmail = (email_) => {
  const test = /\S+@\S+\.\S+/.test(email_); // this regex matches for {bla}@{bla}.{bla} format
  return test;
};

/**
 * Validates a field looking if
 */
const isBetweenLength = (field_, min_, max_ = 255) => {
  const field = field_.trim(); // Removes spaces bars from the borders
  // if dont fits in the range returns with error
  if (field.length < min_ || field.length > max_) return false;
  // otherwise
  return true;
};

/**
 * Creates a new Field Model instace storing a value and a request reference
 */
const createField = (fieldValue_, fieldRequestId_) => {
  const fieldModel = new FieldModel({
    value: fieldValue_,
    request: fieldRequestId_,
  });

  return fieldModel;
};

/**
 * Returns a promise that informs if already exists a user using a given email
 * @return promise with resolve(true|false)
 */
const emailAlreadyExists = (email_) => {
  const user = new User();
  return new Promise((resolve, reject) => {
    user.loadByEmail(email_)
      .then(() => { resolve(true); })
      .catch(() => { resolve(false); });
  });
};

export {
  parseFields,
  formatUserOfFields,
  formatUser,
  isEmail,
  isBetweenLength,
  createField,
  emailAlreadyExists,
};
