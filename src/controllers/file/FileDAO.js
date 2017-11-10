import FileModel from '../../models/file.model';

/** File DAO
 * Interacts with the collection of Files in the database
 *
 * Maradona Morais '2017-11-10 17:53': First definition
 */

export default class {
  /**
   * Returns a new instance (Object) of a File.
   * Model defined in /model/file.model
   * @return File Database Object (D.O.)
   */
  static createObject() {
    return new FileModel();
  }

  /**
   * Saves on the database a File Object
   * @param file_ File D.O.
   */
  static insertFile(file_) {
    return new Promise((resolve, reject) => {
      file_.save((err, doc) => {
        if (err) reject();
        resolve(doc);
      });
    });
  }

  /**
   * Execute a query to database
   */
  static executeQuery(query_) {
    return new Promise((resolve, reject) => {
      query_.exec().then((doc) => {
        resolve(doc);
      }).catch(reject);
    });
  }
}
