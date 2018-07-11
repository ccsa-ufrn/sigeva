import uid from 'uid';
import Module from './Module';
import ModuleObject from '../../models/moduleObject.model';
import CertCon from '../../models/certConnector.model';

class CustomCertModule extends Module {
  constructor(eventId_) {
    super(eventId_, 'Certificado Customizável', 'customcert');
  }

  initialize() {
    this.setEntity('cert', 'Certificado', {
      certTemplate: {
        topImage: 'https://ccsa.ufrn.br/portal/wp-content/uploads/2018/06/cert2018-top.png',
        bottomImage: 'https://ccsa.ufrn.br/portal/wp-content/uploads/2018/06/cert2018-bot.png',
      },
    });
    this.setPermission('create_custom_cert', 'Criar certificado', 'cert');
    return this.store();
  }

  getCertificate(objectId) {
    const entity = this.getEntityBySlug('cert');
    return new Promise((resolve, reject) => {
      const object = this.getAllObjects().find(el => String(el._id) === String(objectId));

      if (object) {
        resolve({
          template: entity.data.certTemplate,
          resultText: object.data.text,
        });
      } else {
        reject('Object doesn\'t exists');
      }
    });
  }

  emitCertificate(text) {
    const certCode = uid(10);

    const newCertificate = new ModuleObject({
      data: {
        text,
        code: certCode,
      },
    });

    this.moduleObject.ofObjects.push(newCertificate);

    return this.store()
      .then(() => {
        const newConn = new CertCon({
          code: certCode,
          event: this.event.eventObject._id,
          module: 'cert',
          entity: 'cert',
          object: newCertificate._id,
        });

        return newConn.save();
      });
  }

  getAllObjects() {
    return this.moduleObject.ofObjects;
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

    const createCertificatePermission = permissionsOnEntity.find(perm => perm.action === 'create_custom_cert');

    switch (subaction) {
      case 'new_certificate':
        if (createCertificatePermission) {
          return this.emitCertificate(body.text);
        }
        break;
      case 'create_certificate':
        if (createCertificatePermission) {
          return this.emitCertificate(body.text);
        }
        break;
      case 'get_certs':
        return this.getAllObjects();
      default:
        return null;
    }
    return null;
  }
}

export default CustomCertModule;
