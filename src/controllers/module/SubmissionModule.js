import Module from './Module';
import SubmissionEntity from '../../models/submissionEntity.model';
import DateRange from '../../models/dateRange.model';

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
  createEntityType(name, slug, requirePayment, description, beginPeriod, endPeriod, maxAuthors) {
    const submissionPeriodRange = new DateRange({
      begin: beginPeriod,
      end: endPeriod,
    });

    const submissionEntity = new SubmissionEntity({
      requirePayment,
      description,
      submissionPeriod: submissionPeriodRange,
      ofRequiredFiles: [],
      ofRequiredFields: [],
      maxAuthors,
    });

    this.setEntity(slug, name, submissionEntity);
    this.setPermission('submit_object', 'Submeter', slug);
    this.setPermission('evaluate_object', 'Avaliar', slug);
    return this.store();
  }

  initialize() {
    return this.createEntityType('Untitled', 'type', true, 'No description', '2018-01-24', '2018-04-01', 5);
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
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const entityId = this.getEntityBySlug(entitySlug)._id;
    const permissionsOnEntity = context.permissions.filter((perm) => {
      return String(perm.entity) === String(entityId);
    });

    const submitPermission = permissionsOnEntity.find(perm => perm.action === 'submit_object');
    const evaluatePermission = permissionsOnEntity.find(perm => perm.action === 'evaluate_object');

    switch (subaction) {
      case 'get_entity':
        if (submitPermission) {
          return new Promise((resolve) => {
            resolve(this.getEntityBySlug(entitySlug));
          });
        }
        break;
      default:
        // Do nothing
    }

    return null;
  }
}

export default SubmissionModule;
