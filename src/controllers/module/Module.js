import ModuleDAO from './ModuleDAO';
import ModuleModel from '../../models/module.model';

/** @@ Module
 * Collection to represents and controll event services
 *
 * @ Log:
 * Maradona Morais '2017-11-04 19:13' >> First definition of the class
 */

export default class Module {
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
   * Loads a module based on current event and slug seted on moduleObject
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

  static getAllModules(eventId) {
    const query = ModuleModel.find({
      event: eventId,
    });

    return new Promise((resolve, reject) => {
      const modules = [];
      ModuleDAO.executeQuery(query)
        .then((docs) => {
          if (docs) {
            docs.forEach((doc) => {
              const modul = new Module();
              modul.moduleObject = doc;
              modules.push(modul);
            }, this);

            resolve(modules);
          }
        }).catch(reject);
    });
  }

  getEntity(entityId) {
    const entity = this.moduleObject.ofEntities.find((ent) => {
      return ent._id.equals(entityId);
    });
    return entity;
  }

  getUserContext(roles) {
    const rolesId = roles.map(role => role._id);

    // filtering permissions to match with user roles
    const permissionsWithRoles = this.moduleObject.ofPermissions.filter((permission) => {
      const intersection = permission.ofRoles.filter((permRole) => {
        let comp = false;
        rolesId.forEach((userRole) => {
          if (!comp) {
            comp = userRole.equals(permRole);
          }
        });
        return comp;
      }, this);
      return intersection.length > 0;
    });

    // get the entities and put each permission in the respective
    const entities = [];

    permissionsWithRoles.forEach((permission) => {
      const entity = this.getEntity(permission.entity);
      if (entity !== undefined) {
        const found = entities.find(ele => ele === entity);
        if (found === undefined) {
          entities.push(entity);
        }
      }
    }, this);

    const response = {
      name: this.moduleObject.name,
      slug: this.moduleObject.slug,
      permissions: permissionsWithRoles,
      entities,
    };

    if (permissionsWithRoles.length === 0) {
      return null;
    }
    return response;
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
