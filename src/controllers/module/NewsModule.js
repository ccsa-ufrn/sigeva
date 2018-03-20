import Module from './Module';
import ModuleObject from '../../models/moduleObject.model';
import ModuleModel from '../../models/module.model';
import NewObject from '../../models/newObject.model';

/** @@ News Module
 * Expose news about the event
 */

class NewsModule extends Module {
  constructor(event) {
    super(event, 'Notícias', 'news');
  }

  /** Initialize a module */
  initialize() {
    return new Promise((resolve, reject) => {
      this.setEntity('news', 'Notícia', {});
      this.setPermission('manage_news', 'Criar notícias', 'news');
      this.store()
        .then(resolve)
        .catch(reject);
    });
  }

  // Create a new on database
  createNew(title, text, highlighted = false) {
    const object = new ModuleObject({
      entity: 'news',
      data: new NewObject({
        title,
        text,
        highlighted,
      }),
    });

    this.moduleObject.ofObjects.push(object);
    return this.store();
  }

  updateNew(newId, title, text) {
    return new Promise((resolve, reject) => {
      ModuleModel.findOneAndUpdate({ _id: this.moduleObject._id, 'ofObjects._id': newId },
        {
          $set: {
            'ofObjects.$.data.title': title,
            'ofObjects.$.data.text': text,
          },
        }, (err) => {
          if (err) reject(err);
          resolve({});
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
    // PUBLIC ENDPOINTS
    switch (subaction) {
      case 'get_news':
        return new Promise((resolve) => {
          resolve(this.moduleObject.ofObjects.reverse());
        });
      default:
        // do nothing
    }

    // PRIVATE ENDPOINTS
    const context = this.getUserContext(roles);
    if (!context) {
      return null;
    }

    const permissions = context.permissions;
    const manageNews = permissions.find(perm => perm.action === 'manage_news');

    switch (subaction) {
      case 'create_new':
        if (manageNews) {
          if (body.title && body.text) {
            return this.createNew(body.title, body.text, body.highlighted);
          }
        }
        break;
      case 'update_new':
        if (manageNews) {
          if (body.newId && body.title && body.text) {
            return this.updateNew(body.newId, body.title, body.text);
          }
        }
        break;
      default:
        // do nothing
    }

    return this;
  }
}

export default NewsModule;
