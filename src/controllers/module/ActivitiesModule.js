import Module from './Module';
import ModuleObject from '../../models/moduleObject.model';
import FileRequirement from '../fileRequirement/FileRequirement';
import FieldRequest from '../fieldRequest/FieldRequest';
import ActivityObject from '../../models/activityObject.model';
import DateRange from '../../models/dateRange.model';
import ActivityEntity from '../../models/activityEntity.model';

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
      case 'create_session':
        if (consolidatePermission) {
          // Continua daqui
        }
        break;
      default:
        // Do nothing
    }

    return null;
  }
}

export default ActivitiesModule;
