import ModuleDAO from './ModuleDAO';
import ModuleModel from '../../models/module.model';
import ModuleEntity from '../../models/moduleEntity.model';
import ModulePermission from '../../models/modulePermission.model';

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
  constructor(event = null, name = null, slug = null) {
    this.moduleObject = ModuleDAO.createObject();
    this.event = event;
    /* It's a stub to handle a bug */
    if (event) {
      this.moduleObject.event = event.eventObject._id;
    }
    this.moduleObject.name = name;
    this.moduleObject.slug = slug;
  }

  /**
   * Loads a module based on current event and slug seted on moduleObject
   */
  load() {
    const query = ModuleModel.findOne({
      event: this.event.eventObject._id,
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

  setEntity(slug, name, data) {
    const entity = this.getEntityBySlug(slug);
    // If already exists a entity with that slug, just update it
    if (entity === undefined) {
      // if it is a new one, just push it
      const newEntity = ModuleEntity({
        name, slug, data,
      });

      this.moduleObject.ofEntities.push(newEntity);
    } else {
      entity.name = name;
      entity.data = data;
    }
  }

  getEntityBySlug(entitySlug) {
    return this.moduleObject.ofEntities.find(ent => ent.slug === entitySlug);
  }

  getEntityById(entityId) {
    return this.moduleObject.ofEntities.find(ent => ent._id.equals(entityId));
  }

  setPermission(action, name, entitySlug) {
    const entity = this.getEntityBySlug(entitySlug);
    if (entity !== undefined) {
      const permission = this.getPermissionByAction(action);
      if (permission === undefined) {
        const newPermission = ModulePermission({
          action, name, entity: (entity._id),
        });

        this.moduleObject.ofPermissions.push(newPermission);
      } else {
        permission.name = name;
      }
    }
  }

  getPermissionByAction(action) {
    return this.moduleObject.ofPermissions.find(perm => perm.action === action);
  }

  getPermissionsByEntityID(entityId) {
    return this.moduleObject.ofPermissions.filter(perm => perm.entity.equals(entityId));
  }

  addRoleToPermission(permissionId, roleId) {
    const permission = this.moduleObject.ofPermissions.find(perm => perm._id.equals(permissionId));

    if (permission !== undefined) {
      const role = permission.ofRoles.find(role => role.equals(roleId));
      if (role === undefined) {
        permission.ofRoles.push(roleId);
      }
    }
  }

  /**
   * Returns a set of entities and permissions of the module based on a set of roles
   * @param roles role's set
   */
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
      const entity = this.getEntityById(permission.entity);
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

  act(user, body, entity, subaction) {
    return this;
  }

  initialize() {
    return this;
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
