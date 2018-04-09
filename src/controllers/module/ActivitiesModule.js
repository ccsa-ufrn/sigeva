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
    switch (subaction) {
      case 'get_entity':
        if (submitPermission) {
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
      default:
        // Do nothing
    }

    return null;
  }
}

export default ActivitiesModule;
