import EventModel from '../../models/event.model';

/** Event DAO (Data Access Object)
 * Interacts with the collection of Event in the database
 *
 * Thayrone Dayvid '2017-08-24 14:01': Define interations with Event Model
 * Maradona Morais '2017-10-28 12:33': Turn all methods to static
 */

// TODO: Support promises
export default class {
  /**
  * Returns a new instance (Object) of a Event Model defined in /models/event.model
  * @return Event Database Object
  */
  static createObject() {
    return new EventModel();
  }

  /**
  * Saves on the database a Event Database Object
  * @param event Event Database Object
  */
  static insertEvent(event_) { // [MR] essa operação não requer uso de promise?
    return new Promise((resolve, reject) => {
      event_.save()
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
