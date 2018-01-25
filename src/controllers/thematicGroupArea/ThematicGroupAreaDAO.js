import ThematicGroupAreaModel from '../../models/thematicGroupArea.model';

/** Thematic Group Area DAO (Data Access Object)
 * Interacts with the collection of TGs Areas in the database
 *
 * Maradona Morais '2018-01-12 15:33': First definition
 */

export default class {
  /**
  * Returns a new instance (Object) of a Thematic Group Area Model
  * defined in /models/thematicGroupArea.model
  * @return Thematic Group Area Object
  */
  static createObject() {
    return new ThematicGroupAreaModel();
  }

  /**
  * Saves on the database a Thematic Group Area Object
  * @param area_ Thematic Group Area Object
  */
  static insertThematicGroupArea(area_) {
    return new Promise((resolve, reject) => {
      area_.save()
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
