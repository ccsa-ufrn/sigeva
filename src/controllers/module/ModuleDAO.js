import ModuleModel from '../../models/module.model';

/** Module DAO (Data Access Object)
 * Interacts with the collection of Modules in the database
 *
 * Maradona Morais '2017-11-04 19:16': First definition
 */

export default class {
  /**
  * Returns a new instance (Object) of a Module Model defined in /models/module.model
  * @return Module Database Object
  */
  static createObject() {
    return new ModuleModel();
  }

  /**
  * Saves on the database a Module Database Object
  * @param module Module Database Object
  */
  static insertModule(module_) {
    return new Promise((resolve, reject) => {
      module_.save()
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
}
