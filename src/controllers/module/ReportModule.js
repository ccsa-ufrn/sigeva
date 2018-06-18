import Module from './Module';
import User from '../user/User';
import ModuleObject from '../../models/moduleObject.model';
import ModuleModel from '../../models/module.model';
import NewObject from '../../models/newObject.model';

/** @@ Report
 * Generate reports
 */

class ReportModule extends Module {
  constructor(event) {
    super(event, 'Relatórios', 'report');
  }

  /** Initialize a module */
  initialize() {
    return new Promise((resolve, reject) => {
      this.setEntity('report', 'Relatório', {});
      this.setPermission('see_all_enrollments', 'Ver inscritos', 'report');
      this.store()
        .then(resolve)
        .catch(reject);
    });
  }

  getAllEnrollments() {
    const usersIds = this.event.eventObject.ofRelationships.map(r => ({ user: r.user }));
    return new Promise((resolve, reject) => {
      ModuleModel.populate(usersIds, [
        { path: 'user', select: 'name email', model: 'User' },
      ], (err, users) => {
        if (err) reject();

        // Add roles
        const userWithRoles = users.map((usr) => {
          const user = usr.user;
          let roles = this.event.getUserRelationships(String(usr.user._id).roles);
          roles = roles.map(role => role.name);
          return Object.assign({}, {
            _id: user._id,
            name: user.name,
            email: user.email,
          }, {
            roles,
          });
        });

        // Add payment info
        this.event.getModule('payment')
          .then((paymentMdle) => {
            const userWithPayInfo = userWithRoles.map((usr) => {
              return Object.assign({}, {
                _id: usr._id,
                name: usr.name,
                email: usr.email,
                roles: usr.roles,
                payment: paymentMdle.getUserInfo(usr._id),
              });
            });
            resolve(userWithPayInfo);
          }).catch(() => { resolve(userWithRoles); });
      });
    });
  }

  getUserReport(uId) {
    const user = new User();
    return new Promise((resolve, reject) => {
      user.loadById(uId)
        .then(() => {
          user.toFormatedUser('cpf institution phone')
            .then((formatedUser) => {
              let roles = this.event.getUserRelationships(String(uId).roles);
              roles = roles.map(role => role.name);

              if (roles.lenght === 0) {
                reject({});
              }

              // mount activities
              this.event.getModule('submission')
                .then((submissionMdle) => {
                  submissionMdle.getObjectsByUserId('article', uId)
                    .then((userArticles) => {
                      submissionMdle.getObjectsByUserId('poster', uId)
                        .then((userPosters) => {
                          submissionMdle.getObjectsByUserId('teachingcases', uId)
                            .then((userTCases) => {
                              this.event.getModule('activities')
                                .then((activitiesMdle) => {
                                  activitiesMdle.getAllObjectsUserEnrolled(uId)
                                    .then((userActivities) => {
                                      resolve({
                                        _id: formatedUser.id,
                                        name: formatedUser.name,
                                        email: formatedUser.email,
                                        ofFields: formatedUser.fields,
                                        roles,
                                        articles: userArticles,
                                        posters: userPosters,
                                        teachingcases: userTCases,
                                        activities: userActivities,
                                      });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
        .catch(() => { reject({}); });
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
    // PRIVATE ENDPOINTS
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const permissions = context.permissions;
    const seeAllEnrollments = permissions.find(perm => perm.action === 'see_all_enrollments');

    switch (subaction) {
      case 'get_all_enrollments':
        if (seeAllEnrollments) {
          return this.getAllEnrollments();
        }
        break;
      case 'get_user_report':
        if (seeAllEnrollments) {
          return this.getUserReport(body.uId);
        }
        break;
      default:
        // do nothing
    }

    return this;
  }
}

export default ReportModule;
