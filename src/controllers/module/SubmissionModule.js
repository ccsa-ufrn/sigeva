import Module from './Module';
import SubmissionEntity from '../../models/submissionEntity.model';
import SubmissionFileRequirement from '../../models/submissionFileRequirement.model';
import ModuleObject from '../../models/moduleObject.model';
import SubmissionObject from '../../models/submissionObject.model';
import FileRequirement from '../fileRequirement/FileRequirement';
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

    switch (subaction) {
      case 'get_entity':
        if (submitPermission) {
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
      default:
        // Do nothing
    }

    return null;
  }
}

export default SubmissionModule;
