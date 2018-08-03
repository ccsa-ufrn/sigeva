import eachOf from 'async/eachOf';
import mongoose from 'mongoose';
import uid from 'uid';
import moment from 'moment';
import 'moment/locale/pt-br';
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
import CertConn from '../../models/certConnector.model';
import { textReplace } from '../event/EventHelper';


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

  getAllObjectsSubmited(entitySlug, userId) {
    const objectsOfEntity = this.moduleObject.ofObjects.filter(obj => obj.entity === entitySlug);
    const filteredObjects = objectsOfEntity.reduce((filtered, option) => {
      const listOfProposers = option.data.ofProposersUsers.map(users => users.toString());
      if (listOfProposers.includes(userId)) {
        filtered.push(option);
      }
      return filtered;
    }, []);
    return new Promise((resolve, reject) => {
      ModuleObject.populate(filteredObjects, [
        { path: 'data.ofProposersUsers', select: 'name email', model: 'User' },
        { path: 'data.ofEnrollments.user', select: 'name email', model: 'User' },
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

  getOneObject(activityId) {
    const activityObject = this.moduleObject.ofObjects.filter(obj => obj._id == activityId)[0];
    return new Promise((resolve, reject) => {
      ModuleObject.populate(activityObject, [
        { path: 'data.ofProposersUsers', select: 'name email', model: 'User' },
        { path: 'data.ofEnrollments.user', select: 'name email', model: 'User' },
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

  setPresence(presence, enrollmentId, activityId) {
    const wholeObject = this.moduleObject.ofObjects.filter(obj => obj._id == activityId)[0];
    const newOfEnrollments = wholeObject.data.ofEnrollments.reduce((filtered, option) => {
      if (option._id == enrollmentId) {
        const switchedPresence = { _id: option._id, user: option.user, present: presence };
        filtered.push(switchedPresence);
      } else {
        filtered.push(option);
      }
      return filtered;
    }, []);
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': activityId },
        {
          $set: {
            'ofObjects.$.data.ofEnrollments': newOfEnrollments },
        },
        { new: true }, (err, doc) => {
          if (err) reject(doc);
          resolve(doc);
        });
    });
  }

  emitCertificate(entitySlug, objectId, type) {
    return new Promise((resolve, reject) => {
      // get all objs
      this.getAllObjects(entitySlug)
        .then((objectsOfEntity) => {
          // find the current
          const object = objectsOfEntity.find(el => String(el._id) == String(objectId));

          if (object) {
            const enrollments = object.data.ofEnrollments;

            eachOf(enrollments, (enroll, key, callback) => {
              if (!enroll.present && !enroll.cert) {
                const certCode = uid(10);
                const newConn = new CertConn({
                  code: certCode,
                  event: this.event.eventObject._id,
                  module: 'activities',
                  entity: entitySlug,
                  certType: type,
                  object: object._id,
                  user: enroll.user,
                });

                enrollments[key].cert = certCode;

                newConn.save()
                  .then(() => { callback(); });
              } else {
                callback();
              }
            },
            () => {
              ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': objectId },
                {
                  $set: {
                    'ofObjects.$.data.ofEnrollments': enrollments,
                  },
                }, (err) => {
                  if (!err) resolve({});
                  reject('Error while saving new connections');
                });
            });
          } else {
            reject('Object doesn\'t exists');
          }
        });
    });
  }

  editObject(objectToEdit) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': objectToEdit._id },
        {
          $set: {
            'ofObjects.$.data.title': objectToEdit.title,
            'ofObjects.$.data.syllabus': objectToEdit.syllabus,
            'ofObjects.$.data.shift': parseInt(objectToEdit.shift, 10),
            'ofObjects.$.data.vacancies': parseInt(objectToEdit.vacancies, 10),
            'ofObjects.$.data.thematicGroup': mongoose.Types.ObjectId(objectToEdit.thematicGroup),
            'ofObjects.$.data.ofProposersUsers': objectToEdit.ofProposersUsers.map(user => mongoose.Types.ObjectId(user._id)),
          },
        }, { new: true }, (err, doc) => {
          if (!err) resolve(doc);
          reject({});
        });
    });
  }

  getCertificate(entitySlug, type, objectId, userId) {
    const entity = this.getEntityBySlug(entitySlug);

    return new Promise((resolve, reject) => {
      this.getAllObjects(entitySlug)
        .then((objectsOfEntity) => {
          const object = objectsOfEntity.find(el => String(el._id) === String(objectId));

          if (object) {
            // look for the enrollment
            const enroll = object.data.ofEnrollments.find(
              el => String(el.user._id) === String(userId));
            if (enroll.present === false) {
              if (entitySlug === 'roundtable' || entitySlug === 'conference') {
                // discover the date
                const date = object.data.consolidation.sessions[0].date;
                const day = moment(date).format('DD');
                const month = moment(date).format('MMMM');
                const year = moment(date).format('YYYY');
                const dateStr = `${day} de ${month} de ${year}`;

                const targetObj = {
                  objName: object.data.title,
                  user: enroll.user.name,
                  date: dateStr,
                };

                const templatedText = textReplace(entity.data.certTemplate.text, targetObj);

                resolve({
                  template: entity.data.certTemplate,
                  resultText: templatedText,
                });
              } else if (entitySlug === 'minicourse') {
                const proposersUsers = object.data.ofProposersUsers.reduce((prev, curr, idx) =>
                  (idx === 0 ? curr.name : `${prev}, ${curr.name}`), '');

                const targetObj = {
                  objName: object.data.title,
                  user: enroll.user.name,
                  proposers: proposersUsers,
                };

                const templatedText = textReplace(entity.data.certTemplate.text, targetObj);

                resolve({
                  template: entity.data.certTemplate,
                  resultText: templatedText,
                });
              } else if (entitySlug === 'workshop') {
                // discover the date
                const date = object.data.consolidation.sessions[0].date;
                const day = moment(date).format('DD');
                const month = moment(date).format('MMMM');
                const year = moment(date).format('YYYY');
                const dateStr = `${day} de ${month} de ${year}`;

                // h/aula
                const numSessions = object.data.consolidation.sessions.length;
                const hAula = 2 * numSessions; // 1 aula = 2h/aula

                const targetObj = {
                  objName: object.data.title,
                  user: enroll.user.name,
                  date: dateStr,
                  workload: hAula,
                };

                const templatedText = textReplace(entity.data.certTemplate.text, targetObj);

                resolve({
                  template: entity.data.certTemplate,
                  resultText: templatedText,
                });
              }


              // const proposersUsers = object.data.ofProposersUsers.reduce((prev, curr, idx) =>
              //   (idx === 0 ? curr.name : `${prev}, ${curr.name}`), '');

              // const targetObj = {
              //   objName: object.data.title,
              //   user: enroll.user.name,
              //   proposers: proposersUsers,
              // };

              // const templatedText = textReplace(entity.data.certTemplate.text, targetObj);

              // resolve({
              //   template: entity.data.certTemplate,
              //   resultText: templatedText,
              // });
            } else {
              reject('User enrolled, but not present');
            }
          }
        });
    });
  }

  editEntity(entitySlug, stateObject) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofEntities.slug': entitySlug },
        {
          $set: {
            'ofEntities.$.name': stateObject.name,
            'ofEntities.$.data.maxProposersUsers': stateObject.maxProposersUsers,
            'ofEntities.$.data.requirePayment': stateObject.requirePayment,
            'ofEntities.$.data.proposalPeriod.begin': new Date(stateObject.startProposalPeriod),
            'ofEntities.$.data.proposalPeriod.end': new Date(stateObject.endProposalPeriod),
            'ofEntities.$.data.enrollmentPeriod.begin': new Date(stateObject.startEnrollmentPeriod),
            'ofEntities.$.data.enrollmentPeriod.end': new Date(stateObject.endEnrollmentPeriod),
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
        if (seeAllPermission || enrollInObject) {
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
        if (enrollInObject && !seeAllPermission) {
          const atvId = body.activityId;
          const userId = body.userId;
          if (this.checkVacancies(entitySlug, atvId)) {
            return this.enrollInObject(atvId, userId);
          }
        }
        if (enrollInObject && seeAllPermission) {
          const atvId = body.activityId;
          const userId = body.userId;
          return this.enrollInObject(atvId, userId);
        }
        break;
      case 'get_objects_submited':
        if (submitPermission) {
          return this.getAllObjectsSubmited(entitySlug, body.userId);
        }
        break;
      case 'exit_object':
        if (enrollInObject) {
          const atvId = body.activityId;
          const userId = body.userId;
          return this.exitObject(atvId, userId);
        }
        break;
      case 'set_presence':
        if (consolidatePermission) {
          const enrollmentId = body.enrollmentId;
          const activityId = body.activityId;
          const presence = body.presence;
          return this.setPresence(presence, enrollmentId, activityId);
        }
        break;
      case 'get_list_to_print':
        if (consolidatePermission) {
          return this.getOneObject(body.activityId);
        }
        break;
      case 'emit_certificate':
        if (seeAllPermission) {
          const objId = body.objectId;
          const type = body.type;
          return this.emitCertificate(entitySlug, objId, type);
        }
        break;
      case 'edit_entity':
        if (seeAllPermission) {
          return this.editEntity(entitySlug, body);
        }
        break;
      case 'edit_object':
        if (seeAllPermission) {
          return this.editObject(body);
        }
        break;
      default:
        // Do nothing
    }

    return null;
  }
}

export default ActivitiesModule;
