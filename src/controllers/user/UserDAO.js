import UserModel from '../../models/user.model';

/**
 * User DAO (Data Access Object)
 * Interacts with the collection of users in the database
 *
 * Maradona Morais '2017-09-22 16:01': Define interations with User Model
 */

// TODO: Support promises
export default class {
  /**
   * Returns a new instance (Object) of a User Model defined in /models/user.model
   * @return User Database Object
   */
  static createObject() {
    return new UserModel();
  }

  /**
   * Saves on the database a User Database Object
   * @param user User Database Object
   */
  static insertUser(user_) {
    return new Promise((resolve, reject) => {
      user_.save()
        .then(resolve).catch(reject);
    });
  }

  /**
   * Executes a query on database
   * @param query_ query that will be executed
   */
  static executeQuery(query_) {
    return new Promise((resolve, reject) => {
      query_.exec().then((doc) => {
        resolve(doc);
      }).catch(reject);
    });
  }

  /**
   * Prints on console logger the crude User Database Object
   */
  static printObject(user_) {
    console.log(user_);
  }
}
