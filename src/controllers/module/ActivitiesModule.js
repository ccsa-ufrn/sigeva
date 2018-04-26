import Module from './Module';
import ModuleModel from '../../models/module.model';
import ModuleObject from '../../models/moduleObject.model';
import FileRequirement from '../fileRequirement/FileRequirement';
import FieldRequest from '../fieldRequest/FieldRequest';
import ActivityObject from '../../models/activityObject.model';
import DateRange from '../../models/dateRange.model';
import ActivityEntity from '../../models/activityEntity.model';
import ActivitySession from '../../models/activitySession.model';
import ActivityConsolidation from '../../models/activityConsolidation.model';
import Enrollment from '../../models/enrollment.model';

/** @@ Activities Module
 * Subclass of Module, that represents the Activities Module
 *
 * @ Log:
 * Maradona Morais '2018-03-13' >> First definition of the class
 */

class ActivitiesModule extends Module {
  constructor(eventId_) {
    super(eventId_, 'Atividades', 'activities');
  }

  initialize() {
    const programRequirement = new FileRequirement();
    programRequirement.setData(
      'Programa da atividade',
      'Programa da atividade',
      'activity-program',
      '.pdf',
    );
    return new Promise((resolve, reject) => {
      programRequirement.store()
        .then((storedProgramRequirement) => {
          this.setEntity('minicourse', 'Minicurso', new ActivityEntity({
            requirePayment: true,
            maxProposersUsers: 4,
            proposalPeriod: new DateRange({
              begin: '2018-02-01',
              end: '2018-04-01',
            }),
            enrollmentPeriod: new DateRange({
              begin: '2018-04-16',
              end: '2018-05-07',
            }),
            ofProposalRequiredFiles: [storedProgramRequirement._id],
            ofProposalRequiredFields: [],
          }));
          this.setPermission('submit_object', 'Submeter proposta', 'minicourse');
          this.store()
            .then(resolve)
            .catch(reject);
        });
    });
  }

  submitObject(entity, data) {
    const object = new ModuleObject({
      entity,
      data: new ActivityObject({
        title: data.title,
        shift: data.shift,
        syllabus: data.syllabus,
        vacancies: data.vacancies,
        ofFields: data.ofFields,
        ofFiles: data.ofFiles,
        ofProposersUsers: data.ofProposersUsers.map(u => u._id),
        status: 'waiting',
        ofEnrollments: [],
      }),
    });

    this.moduleObject.ofObjects.push(object);
    return this.store();
  }

  getAllObjects(entitySlug) {
    const objectsOfEntity = this.moduleObject.ofObjects.filter(obj => obj.entity === entitySlug);
    return new Promise((resolve, reject) => {
      ModuleObject.populate(objectsOfEntity, [
        { path: 'data.ofProposersUsers', select: 'name email', model: 'User' },
        { path: 'data.ofEnrollments.user', select: 'name email', model: 'User' },
        { path: 'data.ofFiles', model: 'File' },
        { path: 'data.ofFields.request', model: 'FieldRequest' },
      ], (err, docs) => {
        ModuleObject.populate(docs, [
          { path: 'data.ofFiles.fileRequirement', model: 'FileRequirement' },
        ], (err_, docs_) => {
          if (err) reject();
          resolve(docs_);
        });
      });
    });
  }

  getAllObjectsToEnroll(entitySlug) {
    const objectsOfEntity = this.moduleObject.ofObjects.filter(obj => obj.entity === entitySlug);
    const objectsToEnroll = objectsOfEntity.filter(obj => obj.data.status === 'consolidated');
    return new Promise((resolve, reject) => {
      ModuleObject.populate(objectsToEnroll, [
        { path: 'data.ofProposersUsers', select: 'name email', model: 'User' },
        { path: 'data.ofFiles', model: 'File' },
        { path: 'data.ofFields.request', model: 'FieldRequest' },
        { path: 'data.consolidation.sessions', select: 'date shift', model: 'ActivitySession'}
      ], (err, docs) => {
        ModuleObject.populate(docs, [
          { path: 'data.ofFiles.fileRequirement', model: 'FileRequirement' },
        ], (err_, docs_) => {
          if (err) reject();
          resolve(docs_);
        });
      });
    });
  }

  getAllObjectsUserEnrolled(userId) {
    const ofEnrollments = this.moduleObject.ofObjects.reduce((filtered, option) => {
      const listOfUsers = option.data.ofEnrollments.map(users => users.user.toString());
      if (listOfUsers.includes(userId)) {
        filtered.push(option);
      }
      return filtered;
    }, []);
    return new Promise((resolve, reject) => {
      ModuleObject.populate(ofEnrollments, [
        { path: 'data.ofProposersUsers', select: 'name email', model: 'User' },
        { path: 'data.ofFiles', model: 'File' },
        { path: 'data.ofFields.request', model: 'FieldRequest' },
        { path: 'data.consolidation.sessions', select: 'date shift', model: 'ActivitySession'}
      ], (err, docs) => {
        ModuleObject.populate(docs, [
          { path: 'data.ofFiles.fileRequirement', model: 'FileRequirement' },
        ], (err_, docs_) => {
          if (err) reject();
          resolve(docs_);
        });
      });
    });
  }

  createSession(eventId, entityId, date, shift) {
    const newSession = new ActivitySession({
      event: eventId,
      entity: entityId,
      date,
      shift,
    });
    return newSession.save();
  }

  getSessions(eventId, entityId) {
    return new Promise((resolve, reject) => {
      ActivitySession.find({ event: eventId, entity: entityId }, (err, res) => {
        if (!err) resolve(res);
        reject();
      });
    });
  }

  consolidateActivity(activityId, sessions, location, vacancies) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': activityId },
        {
          $set: {
            'ofObjects.$.data.status': 'consolidated',
            'ofObjects.$.data.consolidation': new ActivityConsolidation({
              sessions,
              location,
              vacancies,
            }),
          },
        }, (err, doc) => {
          if (!err) resolve({});
          reject({});
        });
    });
  }

  enrollInObject(activityId, user) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': activityId },
        {
          $push: {
            'ofObjects.$.data.ofEnrollments': new Enrollment({
              user,
              present: false,
            }),
          },
        }, (err, doc) => {
          if (!err) resolve({});
          reject({});
        });
    });
  }

  exitObject(activityId, userId) {
    const activity = this.moduleObject.ofObjects.filter(obj => obj._id == activityId);
    const newOfEnrollments = activity[0].data.ofEnrollments.filter(obj => obj.user != userId)
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': activityId },
        {
          $set: {
            'ofObjects.$.data.ofEnrollments': newOfEnrollments },
        }, (err, doc) => {
          if (!err) resolve({});
          reject({});
        });
    });
  }

  checkVacancies(entitySlug, activityId) {
    const objectsOfEntity = this.moduleObject.ofObjects.filter(obj => obj.entity === entitySlug);
    const activity = objectsOfEntity.filter(obj => obj._id == activityId);
    if (activity[0].data.ofEnrollments.length < activity[0].data.consolidation.vacancies) {
      return true;
    }
    return false;
  }

  deconsolidateActivity(activityId) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': activityId },
        {
          $set: {
            'ofObjects.$.data.status': 'waiting',
            'ofObjects.$.data.consolidation': null,
          },
        }, (err, doc) => {
          if (!err) resolve({});
          reject({});
        });
    });
  }

  /**
   * Runs a action performed by the user
   * @param user logged User instance
   * @param roles roles owned by the logged user
   * @param body request POST body
   * @param entitySlug entity identification slug
   * @param subaction action that will be dispacthed
   */
  act(user, roles, body, entitySlug, subaction) {
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }
    const entityId = this.getEntityBySlug(entitySlug)._id;
    const permissionsOnEntity = context.permissions.filter((perm) => {
      return String(perm.entity) === String(entityId);
    });

    const submitPermission = permissionsOnEntity.find(perm => perm.action === 'submit_object');
    const consolidatePermission = permissionsOnEntity.find(perm => perm.action === 'consolidate_object');
    const seeAllPermission = permissionsOnEntity.find(perm => perm.action === 'see_all_objects');
    const enrollInObject = permissionsOnEntity.find(perm => perm.action === 'enroll_in_object');
    switch (subaction) {
      case 'get_entity':
        if (submitPermission || enrollInObject) {
          return new Promise((resolve) => {
            ModuleObject.populate(this.getEntityBySlug(entitySlug), [
              { path: 'data.ofProposalRequiredFields', model: 'FieldRequest' },
              { path: 'data.ofProposalRequiredFiles', model: 'FileRequirement' },
            ], (err, docs) => {
              resolve(docs);
            });
          });
        }
        break;
      case 'submit_object':
        if (submitPermission) {
          return new Promise((resolve) => {
            this.submitObject(entitySlug, body)
              .then(resolve({}))
              .catch(resolve({}));
          });
        }
        break;
      case 'get_all_objects':
        if (seeAllPermission) {
          return this.getAllObjects(entitySlug);
        }
        break;
      case 'create_session':
        if (consolidatePermission) {
          const date = body.date;
          const shift = body.shift;
          return this.createSession(this.event.eventObject._id,
            this.getEntityBySlug(entitySlug)._id, date, shift);
        }
        break;
      case 'get_sessions':
        if (consolidatePermission) {
          return this.getSessions(this.event.eventObject._id, this.getEntityBySlug(entitySlug)._id);
        }
        break;
      case 'consolidate_activity':
        if (consolidatePermission) {
          const atvId = body.activityId;
          const sessions = body.sessions;
          const location = body.location;
          const vacancies = body.vacancies;
          return this.consolidateActivity(atvId, sessions, location, vacancies);
        }
        break;
      case 'deconsolidate_activity':
        if (consolidatePermission) {
          return this.deconsolidateActivity(body.activityId);
        }
        break;
      case 'get_all_objects_to_enroll':
        if (enrollInObject) {
          return this.getAllObjectsToEnroll(entitySlug);
        }
        break;
      case 'get_objects_enrolled':
        if (enrollInObject) {
          const userId = body.userId;
          return this.getAllObjectsUserEnrolled(userId);
        }
        break;
      case 'enroll_in_object':
        if (enrollInObject) {
          const atvId = body.activityId;
          const userId = body.userId;
          if (this.checkVacancies(entitySlug, atvId)) {
            return this.enrollInObject(atvId, userId);
          }
        }
        break;
      case 'exit_object':
        if (enrollInObject) {
          const atvId = body.activityId;
          const userId = body.userId;
          return this.exitObject(atvId, userId);
        }
        break;
      default:
        // Do nothing
    }

    return null;
  }
}

export default ActivitiesModule;
