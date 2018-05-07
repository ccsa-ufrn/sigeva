import Module from './Module';
import SubmissionEntity from '../../models/submissionEntity.model';
import SubmissionFileRequirement from '../../models/submissionFileRequirement.model';
import ModuleObject from '../../models/moduleObject.model';
import SubmissionObject from '../../models/submissionObject.model';
import FileRequirement from '../fileRequirement/FileRequirement';
import DateRange from '../../models/dateRange.model';
import ModuleModel from '../../models/module.model';
import ThematicGroupModule from './ThematicGroupModule';
import ActivitySession from '../../models/activitySession.model';
import ActivityConsolidation from '../../models/activityConsolidation.model';
import eachOf from 'async/eachOf';

/** @@ Submission Module
 * Subclass of Module, that represents the Submission Module
 *
 * @ Log:
 * Maradona Morais '2017-11-04 19:26' >> First definition of the class
 */

class SubmissionModule extends Module {
  /**
   * Initialize a Payment instance creating a empty Object
   */
  constructor(eventId_) {
    super(eventId_, 'Trabalhos', 'submission');
  }

  /**
   * Create a new type of submission by creating a entity
   *
   * @param name type name
   * @param slug type slug
   * @param requirePayment boolean requires payment to submission
   * @param description description
   * @param beginPeriod submission period begin
   * @param endPeriod submission period end
   * @param maxAuthors max number of authors
   */
  createEntityType(name, slug, requirePayment, description, beginPeriod,
    endPeriod, evaluationBeginPeriod, evaluationEndPeriod, files, maxAuthors) {
    const submissionPeriodRange = new DateRange({
      begin: beginPeriod,
      end: endPeriod,
    });

    const evaluationPeriod = new DateRange({
      begin: evaluationBeginPeriod,
      end: evaluationEndPeriod,
    });

    const submissionEntity = new SubmissionEntity({
      requirePayment,
      description,
      submissionPeriod: submissionPeriodRange,
      evaluationPeriod,
      ofRequiredFiles: files,
      maxAuthors,
    });

    this.setEntity(slug, name, submissionEntity);
    this.setPermission('submit_object', 'Submeter', slug);
    return this.store();
  }

  initialize() {
    const articleFileNamed = new FileRequirement();
    articleFileNamed.setData(
      'Artigo original (COM informações de autoria)',
      'Artigo original (COM informações de autoria)',
      'article-named',
      '.doc,.docx,.odt',
    );

    return new Promise((resolve, reject) => {
      articleFileNamed.store()
        .then((storedArticleFileNamed) => {
          const articleFileHidden = new FileRequirement();
          articleFileHidden.setData(
            'Artigo para avaliação (SEM informações de autoria)',
            'Artigo para avaliação (SEM informações de autoria)',
            'article-hidden',
            '.pdf',
          );

          return articleFileHidden.store()
            .then((storedArticleFileHidden) => {
              const files = [
                new SubmissionFileRequirement({
                  fileRequirement: storedArticleFileNamed._id,
                  fileType: 'named',
                }),
                new SubmissionFileRequirement({
                  fileRequirement: storedArticleFileHidden._id,
                  fileType: 'hidden',
                }),
              ];

              this.createEntityType('Artigo', 'article', true, 'No description',
                '2018-03-07', '2018-04-01', '2018-03-07', '2018-04-15', files, 5)
                .then(resolve)
                .catch(reject);
            });
        });
    });
  }

  submitObject(entity, data) {
    const object = new ModuleObject({
      entity,
      data: new SubmissionObject({
        title: data.title,
        abstract: data.abstract,
        keywords: data.keywords,
        thematicGroup: data.thematicGroup,
        authors: data.users.map(u => u._id),
        files: data.files,
      }),
    });

    this.moduleObject.ofObjects.push(object);
    return this.store();
  }

  getObjectsByUserId(entitySlug, userId) {
    const objectsOfEntity = this.moduleObject.ofObjects.filter(obj => obj.entity === entitySlug);
    const objectsOfUser = objectsOfEntity.filter((obj) => {
      let flag = false;
      obj.data.authors.forEach((author) => {
        if (String(author) === String(userId)) {
          flag = true;
        }
      }, this);
      return flag;
    });

    return new Promise((resolve, reject) => {
      ModuleObject.populate(objectsOfUser, [
        { path: 'data.authors', select: 'name', model: 'User' },
        { path: 'data.files', model: 'File' },
        { path: 'data.consolidation.sessions', select: 'date shift', model: 'ActivitySession' },
      ], (err, docs) => {
        ModuleObject.populate(docs, [
          { path: 'data.files.fileRequirement', model: 'FileRequirement' },
        ], (err_, docs_) => {
          if (err_) reject();
          if (docs_) {
            resolve(docs_);
          }
        });
      });
    });
  }

  getAllObjects(entitySlug, event) {
    const objectsOfEntity = this.moduleObject.ofObjects.filter(obj => obj.entity === entitySlug);

    return new Promise((resolve, reject) => {
      event.getModule('thematicgroups')
        .then((tgModule) => {
          tgModule.getThematicGroups()
            .then((thematicGroups) => {
              const objectsOfEntityWithTGs = objectsOfEntity.map((oldObject) => {
                const tgOfObj = thematicGroups
                  .find(tg => String(tg.data._id) === String(oldObject.data.thematicGroup));
                const newObj = oldObject;
                newObj.data.thematicGroup = tgOfObj;
                return newObj;
              });

              ModuleObject.populate(objectsOfEntityWithTGs, [
                { path: 'data.authors', select: 'name email', model: 'User' },
              ], (err, docs) => {
                if (err) reject();
                resolve(docs);
              });
            }).catch(() => { reject(); });
        }).catch(() => { reject(); });
    });
  }

  /**
   * Retrieves submissions that are waiting for approvements (with the state 'to_approve')
   */
  getToEvaluateSubmission(entitySlug, userId, event) {
    // first is necessary find the gts where the user is included as coordinator
    const data = { thematicGroups: [] };
    return new Promise((resolve, reject) => {
      event.getModule('thematicgroups')
        .then((tgModule) => {
          tgModule.getThematicGroups()
            .then((docs) => {
              const userTgsAsCoordinator = docs.filter((tg_) => {
                let flag = false;
                tg_.data.coordinators.forEach((coord) => {
                  if (!flag) {
                    flag = String(coord._id) === String(userId);
                  }
                }, this);
                return flag;
              });

              eachOf(userTgsAsCoordinator, (tg_, key, callback) => {
                const objects = this.moduleObject.ofObjects.filter((obj) => {
                  return (String(obj.data.thematicGroup) === String(tg_.data._id))
                    && obj.entity === entitySlug;
                });

                ModuleObject.populate(objects, [
                  { path: 'data.files', model: 'File' },
                ], (err, docs_) => {
                  data.thematicGroups.push({
                    name: tg_.data.name,
                    _id: tg_._id,
                    objects: docs_,
                  });
                  callback();
                });
              }, () => { resolve(data); });
            });
        });
    });
  }

  createSession(eventId, entityId, date, shift, hour) {
    const newSession = new ActivitySession({
      event: eventId,
      entity: entityId,
      date,
      shift,
      hour,
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

  changeObjectState(entitySlug, objectId, newState, userActorId, event) {
    return new Promise((resolve, reject) => {
      this.getToEvaluateSubmission(entitySlug, userActorId, event)
        .then((userTgs) => {
          let found = false;
          userTgs.thematicGroups.forEach((tg_) => {
            tg_.objects.forEach((obj_) => {
              if (!found) {
                found = (String(obj_.data._id) === String(objectId));
              }
            }, this);
          }, this);
          if (found) {
            // if found the object this user can evaluate it!
            const newOfObjects = this.moduleObject.ofObjects.map((obj) => {
              if (String(obj.data._id) === objectId) {
                const newObj = obj;
                newObj.data.state = newState;
                return newObj;
              }
              return obj;
            });

            ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id },
              {
                $set: {
                  ofObjects: newOfObjects,
                },
              }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
              });
          }
        });
    });
  }

  scheduleSubmissions(submissionsId, sessions, location) {
    Promise.all(submissionsId.map((submission) => {
      return new Promise((resolve, reject) => {
        ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': submission },
          {
            $set: {
              'ofObjects.$.data.consolidation': new ActivityConsolidation({
                sessions,
                location,
              }),
            },
          }, (err, doc) => {
            if (!err) resolve({});
            reject({});
          });
      });
    }))
      .then(data => data)
      .catch(data => data);
  }

  cancelSubmissionPresentation(submissionId) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': submissionId },
        {
          $set: {
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
  act(user, roles, body, entitySlug, subaction, event) {
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const entityId = this.getEntityBySlug(entitySlug)._id;
    const permissionsOnEntity = context.permissions.filter((perm) => {
      return String(perm.entity) === String(entityId);
    });

    const submitPermission = permissionsOnEntity.find(perm => perm.action === 'submit_object');
    const seePermission = permissionsOnEntity.find(perm => perm.action === 'see_objects');
    const seeAllPermission = permissionsOnEntity.find(perm => perm.action === 'see_all_objects');
    const schedulePermission = permissionsOnEntity.find(perm => perm.action === 'schedule_object');

    switch (subaction) {
      case 'get_entity':
        if (submitPermission || seePermission || seeAllPermission) {
          return new Promise((resolve) => {
            resolve(this.getEntityBySlug(entitySlug));
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
      case 'get_my_objects':
        if (seePermission) {
          return this.getObjectsByUserId(entitySlug, user.userObject._id);
        }
        break;
      case 'get_all_objects':
        if (seeAllPermission) {
          return this.getAllObjects(entitySlug, event);
        }
        break;
      case 'get_to_evaluate_submissions':
        return this.getToEvaluateSubmission(entitySlug, user.userObject._id, event);
      case 'change_object_state':
        return this.changeObjectState(entitySlug,
          body.objectId,
          body.newState,
          user.userObject._id,
          event);
      case 'create_session':
        if (schedulePermission) {
          const date = body.date;
          const shift = body.shift;
          const hour = body.hour;
          return this.createSession(this.event.eventObject._id,
            entityId, date, shift, hour);
        }
        break;
      case 'get_sessions':
        if (schedulePermission) {
          return this.getSessions(this.event.eventObject,
            entityId);
        }
        break;
      case 'schedule_submissions':
        if (schedulePermission) {
          const submissionsId = body.selectedSubmissions;
          const sessions = body.sessions;
          const location = body.location;
          return this.scheduleSubmissions(submissionsId, sessions, location);
        }
        break;
      case 'cancel_submission_presentation':
        if (schedulePermission) {
          const submissionId = body.submissionId;
          return this.cancelSubmissionPresentation(submissionId);
        }
        break;
      default:
        // Do nothing
    }

    return null;
  }
}

export default SubmissionModule;
