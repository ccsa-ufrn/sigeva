import UserDAO from './UserDAO';
import System from '../system/System';
import * as UserHelper from './UserHelper';

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
    this.userObject = UserDAO.createObject();
  }

  /**
   * Validate and sets user's informations
   * @param data set of fields to load
   * @return parsed user fields | error message.
   */
  setData(data_) {
    const fixedFields = ['name', 'password', 'email'];
    const errors = []; // Array of errors

    // Validade fixed fields
    fixedFields.forEach((field) => {
      if (data_[field]) {
        // Validade name
        if (field === 'name') {
          if (!UserHelper.isBetweenLength(data_[field], 3)) {
            // Throw invalid name error
            // TODO: A name of user must have at least 1 space
            errors.push({
              field,
              message: 'Valor inválido para nome',
            });
          }
        }

        // Validate email
        if (field === 'email') {
          if (!UserHelper.isEmail(data_[field]) ||
              !UserHelper.isBetweenLength(data_[field], 3, 65)) {
            // Throw invalid email error
            errors.push({
              field,
              message: 'Valor inválido para email',
            });
          }
        }

        // Validate password
        if (field === 'password') {
          if (!UserHelper.isBetweenLength(data_[field], 5, 20)) {
            // Throw invalid password error
            errors.push({
              field,
              message: 'A senha deve ter entre 5 e 20 caracteres',
            });
          }
        }

        // Set field in the object
        this.userObject[field] = data_[field].trim();
      } else {
        // It's a required field, must be received
        errors.push({
          field,
          message: 'É obrigatório preencher este campo',
        });
      }
    });

    return new Promise((resolve, reject) => {
      // Validate user email existence
      UserHelper.emailAlreadyExists(this.userObject.email)
        .then((exists) => {
          if (exists) {
            errors.push({
              field: 'email',
              message: 'Já existe uma conta com este endereço de email',
            });
            reject(errors); // Finish the registration with error
          } else {
            // Validate de configurable fields
            System.getRegisterFieldRequests()
              .then((fieldRequests) => {
                fieldRequests.forEach((fieldReq) => {
                  if (data_[fieldReq.name]) { // The body.field with that name exists
                    // Create a Field and append it in ofFields
                    const field = UserHelper.createField(data_[fieldReq.name], fieldReq._id);
                    this.userObject.ofFields.push(field);
                  } else if (fieldReq.required) {
                    // The body.field doesn't exists
                    errors.push({
                      field: fieldReq.name,
                      message: `O campo ${fieldReq.readableName.toLowerCase()} é obrigatório`,
                    });
                  }
                });
                if (errors.length !== 0) {
                  reject(errors);
                } else {
                  // Set the common type to the user
                  this.userObject.ofTypes.push('common');
                  resolve();
                }
              });
          }
        });
    });
  }

  // TODO: Maybe it is not this way
  static loadById(objectId_) {
    // Loads the .userObject with a User Database Object searched by passed ID
  }


  /**
   * Load user by email
   * @param email_ email to search for
   * @return true if the
   */
  loadByEmail(email_) {
    const query = userModel.findOne({ email: email_ });
    query.populate({
      path: 'ofField.request',
      model: fieldRequestModel,
    });

    return new Promise((resolvze, reject) => {
      UserDAO.executeQuery(query).then((doc) => {
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

  static setFields(fields_) {
    // Recieves a Array of fixed fields, with values to: 'name', 'email', 'password'
  }

  // TODO: Maybe it is not this way
  static authorize(email_, password_) {
    // Checks if the user authentication credentials are valids, must return a boolean (maybe)
  }

  store() {
    return new Promise((resolve, reject) => {
      UserDAO.insertUser(this.userObject)
        .then((userDoc) => {
          UserHelper.formatUserOfFields(userDoc)
            .then((parsedOfFields) => {
              // Everything is ok, can return the user
              resolve(UserHelper.formatUser(userDoc, parsedOfFields));
            });
        }).catch(reject);
    });
  }
}
