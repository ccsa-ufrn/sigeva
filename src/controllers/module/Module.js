import ModuleDAO from './ModuleDAO';
import ModuleModel from '../../models/module.model';

/** @@ Module
 * Collection to represents and controll event services
 *
 * @ Log:
 * Maradona Morais '2017-11-04 19:13' >> First definition of the class
 */

export default class {
  /**
   * Initialize a Module instance creating a empty Object
   */
  constructor(eventId = null, name = null, slug = null) {
    this.moduleObject = ModuleDAO.createObject();
    this.moduleObject.event = eventId;
    this.moduleObject.name = name;
    this.moduleObject.slug = slug;
  }

  /**
   * Loads a event based on current event and slug seted on moduleObject
   */
  load() {
    const query = ModuleModel.findOne({
      event: this.moduleObject.event,
      slug: this.moduleObject.slug,
    });

    return new Promise((resolve, reject) => {
      ModuleDAO.executeQuery(query)
        .then((doc) => {
          if (doc) {
            this.moduleObject = doc;
            resolve(doc);
          } else {
            resolve(null);
          }
        })
        .catch(reject);
    });
  }

  setActive(value) {
    this.moduleObject.active = value;
  }

  /**
   * Insert a module in db
   * @return Promise. Resolve(set event values on), Reject(Error)
   */
  store() {
    return new Promise((resolve, reject) => {
      ModuleDAO.insertModule(this.moduleObject)
        .then((moduleDoc) => {
          resolve(moduleDoc);
        }).catch(reject);
    });
  }
}
