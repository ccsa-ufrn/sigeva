import ThematicGroupAreaDAO from './ThematicGroupAreaDAO';
import ThematicGroupAreaModel from '../../models/thematicGroupArea.model';

/** @@ Thematic Group Area
 * Collection to represent and controll TGs areas
 *
 * @ Log:
 * Maradona Morais '2018-01-12 15:37' >> First definition of the class
 */

export default class {
  /**
   * Initialize a Area instance
   * @param {*} event
   * @param {*} name
   */
  constructor(event = null, name = 'Untitled') {
    this.areaObject = ThematicGroupAreaDAO.createObject();
    this.areaObject.name = name;
    this.event = event;

    if (event) {
      this.areaObject.event = event.eventObject._id;
    }
  }

  /**
   * Returns a set of event's areas
   * @param event Event id
   */
  static getAreasByEventId(event) {
    const query = ThematicGroupAreaModel.find({ event });
    return new Promise((resolve, reject) => {
      ThematicGroupAreaDAO.executeQuery(query)
        .then((docs) => {
          resolve(docs);
        })
        .catch(reject);
    });
  }

  /**
   * Insert a area in db
   * @return Promise. Resolve(set event values on), Reject(Error)
   */
  store() {
    return new Promise((resolve, reject) => {
      ThematicGroupAreaDAO.insertThematicGroupArea(this.areaObject)
        .then((areaDoc) => {
          resolve(areaDoc);
        }).catch(reject);
    });
  }
}
