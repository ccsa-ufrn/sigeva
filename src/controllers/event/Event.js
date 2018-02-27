import EventDAO from './EventDAO';
import EventModel from '../../models/event.model';
import FieldError from '../FieldError';

import RoleModel from '../../models/role.model';
import RelationshipModel from '../../models/relationship.model';

import Module from '../module/Module';
import PaymentModule from '../module/PaymentModule';
import ThematicGroupModule from '../module/ThematicGroupModule';
import SubmissionModule from '../module/SubmissionModule';

import * as EventHelper from './EventHelper';

/**
 * @@ Event
 * Stores and manipulates Event Database Object
 *
 * @ Log:
 * Maradona Morais '2017-10-31 15:55' >> Defines the methods enroll() and createRelationship()
 *                                       with pendences, please see the issue #44
 */
export default class {
  /**
   * Initialize a Event instance creating a EventDAO and requesting a empty Object.
   */
  constructor() {
    this.eventObject = EventDAO.createObject();
  }

  /**
   * Validate and sets event informations
   * @param data set of fields to load
   * @return error message.
   */
  setData(data_) {
    const fixedFields = ['name', 'subtitle', 'location'];
    const errors = []; // Array of errors

    // Defining event period
    const eventPeriodBegin = EventHelper.parseDate(data_.eventPeriodBegin);
    const eventPeriodEnd = EventHelper.parseDate(data_.eventPeriodEnd);

    const eventPeriod = EventHelper.mountDateRange(eventPeriodBegin, eventPeriodEnd, errors, 'eventPeriod');
    if (eventPeriod) {
      this.eventObject.eventPeriod = eventPeriod;
    }

    // Defining enrollment period
    const enrollmentPeriodBegin = EventHelper.parseDate(data_.enrollmentPeriodBegin);
    const enrollmentPeriodEnd = EventHelper.parseDate(data_.enrollmentPeriodEnd);

    const enrollmentPeriod = EventHelper.mountDateRange(enrollmentPeriodBegin, enrollmentPeriodEnd, errors, 'enrollmentPeriod');
    if (enrollmentPeriod) {
      this.eventObject.enrollmentPeriod = enrollmentPeriod;
    }

    // A event aways have the role "Coordenador" by default and not editable
    const coordinatorRole = new RoleModel({
      name: 'Coordenador',
      description: 'Usuário coordenador do evento',
      type: 'private',
      editable: false,
    });

    this.eventObject.ofRoles.push(coordinatorRole);

    fixedFields.forEach((field) => {
      if (data_[field]) {
        if (!EventHelper.isBetweenLength(data_[field], 3)) {
          errors.push(FieldError(field, `Valor inválido para ${field}`));
        } else {
          this.eventObject[field] = data_[field];
        }
      } else {
        // It's a required field, must be received
        errors.push(FieldError(field, 'É obrigatório preencher este campo'));
      }
    });

    return new Promise((resolve, reject) => {
      if (errors.length !== 0) {
        reject(errors);
      } else {
        resolve();
      }
    });
  }

  /**
   * Load event by ID
   * @param id_ event identification
   * @return Promise. Resolves if event exists, rejects otherwise.
   */
  loadById(id_) {
    const query = EventModel.findOne({ _id: id_ });
    return new Promise((resolve, reject) => {
      EventDAO.executeQuery(query)
        .then((event) => {
          if (event) {
            // Set this current event with the returned
            this.eventObject = event;
            resolve();
          } else {
            // Event not found
            reject();
          }
        }).catch(reject);
    });
  }

  /**
   * Returns a formated Event filtered by fields
   * @param fields_ Fields to extract from the event
   * @return a formated event
   */
  toFormatedEvent(fields_) {
    // The passed fields_ is in the format 'name,subtitle,location'. We must parse it to Mongoose
    // format and restrict with fields are requestable
    const formatedFields = EventHelper.eventFieldsParse(fields_);
    return EventHelper.formatEvent(this.eventObject, formatedFields); // stub
  }

  /**
   * List all events
   * @param req values
   * @error message
   * @return Promise. Resolve(Events), Rejects(Errors)
   */
  static loadEvents(page_, count_, query_, fields_, sort_, published_) {
    const fieldsStr = EventHelper.eventFieldsParse(fields_);
    const queryStr = `${query_}.*`;
    const query = query_ !== '' ? { name: { $regex: queryStr, $options: 'i' } } : {};
    query.published = published_;

    let skipNum = 0;
    if (page_ > 1) {
      skipNum = (page_ - 1) * count_;
    }

    return new Promise((resolve) => {
      EventModel
        .find(query, fieldsStr, { skip: skipNum })
        .sort(sort_)
        .limit(count_)
        .then((docs) => {
          const parsedSet = docs.map((event) => {
            return EventHelper.formatEvent(event, fieldsStr);
          });
          resolve(parsedSet);
        });
    });
  }

  /**
   * Creates a new role in the event
   * @param name role's name
   * @param description role's description
   * @param type role's type
   * @param editable if the role is editable of static
   */
  createRole(name, description, type, editable = true) {
    const roleObj = {
      name,
      description,
      type,
      editable,
    };

    return new Promise((resolve, reject) => {
      // Validate if name and description are filled
      ['name', 'description'].forEach((field) => {
        if (roleObj[field] == null) {
          reject();
        }
      });

      const newRole = new RoleModel(roleObj);
      this.eventObject.ofRoles.push(newRole);

      this.store()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   *
   * @param type role's type. If type is null return all actives types.
   */
  getRoles(type = 'public') {
    if (type === null) {
      return this.eventObject.ofRoles.filter((role) => {
        return (role.active);
      });
    }
    return this.eventObject.ofRoles.filter((role) => {
      return (role.type === type && role.active);
    });
  }

  /**
   * Returns user's roles in a event
   * @param userId_ user id
   */
  getUserRelationships(userId_) {
    const userRelationship = this.eventObject.ofRelationships.find((relationship) => {
      return relationship.user == userId_;
    });

    if (userRelationship === undefined) {
      return [];
    }

    const roles = this.eventObject.ofRoles.filter((role) => {
      let flag = false;
      for (let i = 0; i < userRelationship.ofRoles.length; i += 1) {
        if (!flag && (String(userRelationship.ofRoles[i]) === String(role._id))) {
          flag = true;
        }
      }
      return flag;
    });

    return roles;
  }

  /**
   * Enrolls a user in the event based on a role id
   * @param user user to be enrolled
   * @param roleId event's role id that the user will have
   */
  enroll(user, roleId) {
    return new Promise((resolve, reject) => {
      // find the role in event object
      const role = this.eventObject.ofRoles.id(roleId);

      if (role === undefined || role.type === 'private') {
        // The role doesn't exists or it is invalid to enroll on
        reject('Papel não encontrado');
      } else {
        // The role exists, then create a relationship
        this.createRelationship(user, role)
          .then(() => {
            this.store()
              .then(resolve)
              .catch(reject);
          }).catch(reject);
      }
    });
  }

  /**
   * Creates a relationship between a user and the event by atributting a event's role to
   * the passed user
   * @param user user to be related to
   * @param role event's role to relate the user with
   */
  createRelationship(user, role) {
    const relationshipIdx = this.eventObject.ofRelationships.findIndex((currRelationship) => {
      return String(currRelationship.user) == String(user.userObject._id);
    });

    if (relationshipIdx === -1) { // Not found relationship
      // Create a new one
      const newRelationship = new RelationshipModel({
        user: user.userObject._id,
        ofRoles: [role._id],
      });
      this.eventObject.ofRelationships.push(newRelationship);
    } else {
      // Already has a role set, just append a new role into it
      this.eventObject.ofRelationships[relationshipIdx].ofRoles.push(role._id);
      // TODO: The user class must have a method called addEventToList (or similar)
      //       to add the reference to the current event in the user's Array ofEvents
      // TODO: What if the user already have a public relationship with this event?
      //       Whats the best way to figure this out?
    }
    return user.addEvent(this);
  }

  getUserContext(user) {
    const userId = user.userObject._id;
    const userRoles = this.getUserRelationships(String(userId));

    return new Promise((resolve, reject) => {
      Module.getAllModules(this.eventObject._id)
        .then((modules) => {
          const modulesContext = [];
          modules.forEach((modul) => {
            const userContext = modul.getUserContext(userRoles);
            if (userContext !== null) {
              modulesContext.push(userContext);
            }
          });
          resolve(modulesContext);
        }).catch(reject);
    });
  }

  /**
   * Creates a module Object from a module's slug name
   * @param moduleSlug module slug identification
   * @return a module subclass object or null if the module type doesn't exists
   */
  moduleFactory(moduleSlug) {
    let module = null;
    switch (moduleSlug) {
      case 'payment':
        module = new PaymentModule(this);
        break;
      case 'thematicgroups':
        module = new ThematicGroupModule(this);
        break;
      case 'submission':
        module = new SubmissionModule(this);
        break;
      default:
        // do nothing
        break;
    }

    return module;
  }

  /**
   * Gets a module object from the event
   * @param moduleSlug module slug identification
   * @return a module subclass object loaded or null if it not exists
   */
  getModule(moduleSlug) {
    const module = this.moduleFactory(moduleSlug);
    return new Promise((resolve, reject) => {
      if (module) {
        module.load()
          .then((doc) => {
            return doc ? resolve(module) : resolve(null);
          }).catch(reject);
      } else { resolve(null); }
    });
  }

  /**
   * Actives a module in the event
   * @param moduleSlug module slug identification
   */
  activeModule(moduleSlug) {
    return new Promise((resolve, reject) => {
      this.getModule(moduleSlug)
        .then((module) => {
          let tempModule = null;

          if (module) {
            // already exists this module
            tempModule = module;
            tempModule.setActive(true);
          } else {
            // this module not exists yet
            tempModule = this.moduleFactory(moduleSlug);
            tempModule.initialize()
              .then(resolve)
              .catch(reject);
          }

          if (tempModule) {
            tempModule.store()
              .then(resolve).catch(reject);
          } else { reject(); }
        }).catch(reject);
    });
  }

  /**
   * Deactivate a module from the event
   * @param moduleSlug module slug identification
   */
  deactivateModule(moduleSlug) {
    return new Promise((resolve, reject) => {
      this.getModule(moduleSlug)
        .then((module) => {
          if (module) {
            module.setActive(false);
            module.store()
              .then(resolve).catch(reject);
          } else {
            reject();
          }
        }).catch(reject);
    });
  }

  /**
   * Insert a event in db
   * @return Promise. Resolve(set event values on), Reject(Error)
   */
  store() {
    return new Promise((resolve, reject) => {
      EventDAO.insertEvent(this.eventObject)
        .then((eventDoc) => {
          resolve(eventDoc);
        }).catch(reject);
    });
  }
}
