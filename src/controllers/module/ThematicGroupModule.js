import Module from './Module';
import ModuleModel from '../../models/module.model';
import ModuleObject from '../../models/moduleObject.model';
import ThematicGroupArea from '../thematicGroupArea/ThematicGroupArea';
import ThematicGroup from '../../models/thematicGroup.model';

/** @@ Thematic Group Module
 * Module to set up and control Thematic Groups that composes
 * the event
 *
 * @ Log:
 * Maradona Morais '2018-01-08 15:42' (first code in the year) >> First definition of the class
 */

class ThematicGroupModule extends Module {
  /**
   * Initialize a ThematicGroupModule object
   */
  constructor(event) {
    super(event, 'Grupos Temáticos', 'thematicgroups');
  }

  /**
   * Method runned when the module get activated
   */
  initialize() {
    return new Promise((resolve, reject) => {
      // Create the unique entity...
      this.setEntity('thematicgroups', 'Grupos Temáticos', {});

      // ... and set the permissions to manage areas and thematic groups
      this.setPermission('manage_areas', 'Gerenciar Áreas', 'thematicgroups');
      this.setPermission('manage_tgs', 'Gerenciar Grupos Temáticos', 'thematicgroups');
      this.setPermission('update_coordinators', 'Atualizar coordenadores', 'thematicgroups');
    });
  }

  /**
   * Runs a action performed by the user
   * @param user logged User instance
   * @param roles roles owned by the logged user
   * @param body request POST body
   * @param entitySlug entitty identification slug
   * @param subaction action that will be dispacthed
   */
  act(user, roles, body, entitySlug, subaction) {
    // PUBLIC ENDPOINTS
    // Getting Thematic Groups
    switch (subaction) {
      case 'get_tgs':
        // return new Promise((resolve) => {
        //   resolve(this.moduleObject.ofObjects); // always resolves
        // });
        return this.getThematicGroups();
      default:
        // do nothing
    }

    // PRIVATE ENDPOINTS
    // Gets user capabilities to passed set of roles
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const permissions = context.permissions;
    const manageAreas = permissions.find(perm => perm.action === 'manage_areas');
    const manageTGs = permissions.find(perm => perm.action === 'manage_tgs');
    const updateCoordinators = permissions.find(perm => perm.action === 'update_coordinators');

    switch (subaction) {
      case 'create_area':
        if (manageAreas) {
          // To create an area is expected an area name
          const areaName = body.areaName;
          return this.createArea(areaName);
        }
        break;
      case 'get_areas':
        if (manageAreas) {
          return this.getAreas();
        }
        break;
      case 'create_tg':
        if (manageTGs) {
          const tgName = body.tgName;
          const tgDescription = body.tgDescription;
          const areaId = body.areaId;

          return this.createThematicGroup(areaId, tgName, tgDescription);
        }
        break;
      case 'update_coordinators':
        if (updateCoordinators) {
          const coordinators = body.coordinators;
          // coordinators must be a array of users IDs
          const tgId = body.tgId;

          return this.updateCoordinators(tgId, coordinators);
        }
        break;
      default:
        // do nothing
    }

    return false; // TODO: It's a stub, not really apropriated
  }

  /**
   * Creates a new TGs area in the event
   * @param name new area name
   */
  createArea(name = 'Untitled') {
    const newArea = new ThematicGroupArea(this.event, name);
    return newArea.store();
  }

  /**
   * Creates a new TG in the event (Object of the module)
   * @param area area ID
   * @param name tg name
   * @param description tg description
   */
  createThematicGroup(area, name = 'Untitled', description = '') {
    const tgObject = new ModuleObject({
      entity: 'thematicgroups',
      data: new ThematicGroup({
        name,
        description,
        area,
        coordinators: [],
      }),
    });

    this.moduleObject.ofObjects.push(tgObject);
    return this.store();
  }

  /**
   * Update a TG's coordinators list
   * @param tgId tg id
   * @param coordinators array with coordinators (users) IDs
   */
  updateCoordinators(tgID, coordinators) {
    // find the thematic group by ID in ofObjects array
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': tgID },
        {
          $set: {
            'ofObjects.$.data.coordinators': coordinators,
          },
        }, (err, doc) => {
          if (err) reject();
          resolve(doc);
        });
    });
  }

  /**
   * Returns a set of areas in the event
   */
  getAreas() {
    return ThematicGroupArea.getAreasByEventId(this.moduleObject.event);
  }

  getThematicGroups() {
    const thematicGroups = this.moduleObject.ofObjects;
    return new Promise((resolve, reject) => {
      ModuleObject.populate(thematicGroups, [
        { path: 'data.coordinators', select: 'name email', model: 'User' },
        { path: 'data.area', select: 'name', model: 'thematicGroupArea' },
      ], (err, docs) => {
        if (err) reject();
        resolve(docs);
      });
    });
  }
}

export default ThematicGroupModule;
