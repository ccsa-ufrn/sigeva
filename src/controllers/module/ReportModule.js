import Module from './Module';
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
        { path: 'user', select: 'name email ofFields', model: 'User' },
      ], (err, users) => {
        if (err) reject();

        // Add roles
        const userWithRoles = users.map((usr) => {
          const user = usr.user;
          let roles = this.event.getUserRelationships(String(usr.user._id));
          roles = roles.map(role => role.name);
          return Object.assign({}, {
            _id: user._id,
            name: user.name,
            email: user.email,
          }, {
            roles,
          });
        });
        resolve(userWithRoles);

        // ModuleModel.populate(users, [{ path: 'user.ofFields.request', model: 'FieldRequest' }],
        //   (err_, usrsWithFields) => {
        //     if (err_) reject();
        //     resolve(usrsWithFields);
        //   });
      });
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
      default:
        // do nothing
    }

    return this;
  }
}

export default ReportModule;
