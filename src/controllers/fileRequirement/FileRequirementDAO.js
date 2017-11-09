import FileRequirementModel from '../../models/fileRequirement.model';

/** FileRequirement DAO
 * Interacts with the collection of FileRequirements in the database
 *
 * Maradona Morais '2017-11-09 12:17': First definition
 */

export default class {
  /**
   * Returns a new instance (Object) of a File Requirement.
   * Model defined in /model/fileRequirement.model
   * @return FileRequirement Database Object (D.O.)
   */
  static createObject() {
    return new FileRequirementModel();
  }

  /**
   * Saves on the database a FileRequirement Object
   * @param fileRequirement_ FileRequirement D.O.
   */
  static insertFileRequirement(fileRequirement_) {
    return new Promise((resolve, reject) => {
      fileRequirement_.save((err, doc) => {
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
