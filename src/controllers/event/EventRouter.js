import { Router } from 'express';
import Event from './Event';
import User from '../user/User';
import ModuleObject from '../../models/moduleObject.model';
import Response from '../Response';
import { simpleAuthorization } from '../authorization/Authorization';
import * as Constants from './constants';
import ThematicGroupArea from '../thematicGroupArea/ThematicGroupArea';
import CertConn from '../../models/certConnector.model';

/**
 * @@ Event Express Router
 * Routers paths to '/api/event' prefix
 *
 * @ Log:
 * Maradona Morais '2017-10-31' >> Create the path to enroll a user into the event
 */
const eventRouter = Router();

/**
 * Create a new event
 * @param fields representing a event
 * @return Created event object
 */
eventRouter.post('/', (req, res) => {
  const event = new Event();
  event.setData(req.body)
    .then(() => {
      event.store()
        .then(() => {
          const formatedEvent = event.toFormatedEvent('name,subtitle,eventPeriod,enrollmentPeriod,location,published');
          res.json(Response(false, formatedEvent));
        }).catch((err) => {
          res.json(Response(true, {}, err));
        });
    }).catch((data) => {
      res.status(400).json(Response(true, data, Constants.EVENT_CREATION_ERROR_MSG));
    });
});

/**
 * Returns a set of events
 * See a rich documentation in '/docs/evento.br.md'
 *
 * @MissingTests
 */
eventRouter.get('/', (req, res) => {
  const page = (req.query.page) ? parseInt(req.query.page, 10) : 1;
  const count = (req.query.count) ? parseInt(req.query.count, 10) : 5;
  const query = (req.query.query) ? req.query.query : '';
  const fields = (req.query.fields) ? req.query.fields : 'name,subtitle,location,eventPeriod,enrollmentPeriod,published,thumbnail';
  const order = (req.query.order) ? req.query.order : '-createdAt'; // News events first
  const published = (req.query.published) ? req.query.published : true;
  // By default returns published events

  Event.loadEvents(page, count, query, fields, order, published)
    .then((eventSet) => {
      res.json(Response(false, eventSet));
    }).catch(() => {
      res.json(Response(true, {}));
    });
});

/**
 * Creates a role in event's roles
 * @param name role's name
 * @param description role's description
 * @param type role's type
 */
eventRouter.post('/:id/role', (req, res) => {
  const roleName = req.body.name ? req.body.name : null;
  const roleDescription = req.body.description ? req.body.description : 'Sem descrição';
  const roleType = req.body.type ? req.body.type : 'public';

  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      return event.createRole(roleName, roleDescription, roleType);
    })
    .then(() => {
      res.json(Response(false, {}));
    })
    .catch(() => {
      res.status(500).json(Response(true, {}, Constants.EVENT_NEW_ROLE_ERROR_MSG));
    });
});

/**
 * Gets the event public role's list
 * @param id event's id
 */
eventRouter.get('/:id/role', (req, res) => {
  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      res.json(Response(false, event.getRoles()));
    })
    .catch(() => {
      res.status(404).json(Response(true, {}, Constants.EVENT_NOT_FOUND_MSG));
    });
});

/**
 * Returns the user's relationships in the event
 * @param id event's id
 */
eventRouter.get('/:id/relationship', simpleAuthorization, (req, res) => {
  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      res.json(Response(false, event.getUserRelationships(res.locals.user._id)));
    })
    .catch((e) => {
      res.status(404).json(Response(true, {}, Constants.EVENT_NOT_FOUND_MSG));
    });
});

/**
 * Allows to a user enroll a event by selecting a public role
 * @param id event id to be enrolled onto
 * @param role the event's public role id (please see /docs/papel.br.md)
 *
 * @MissingTests
 */
eventRouter.post('/:id/enroll', simpleAuthorization, (req, res) => {
  const roleId = req.body.role; // The role id that the user wants to enroll with

  // Load the logged user in a User object by the id
  const user = new User();
  user.loadById(res.locals.user._id)
    .then(() => {
      // Load the current event by the id
      const event = new Event();
      event.loadById(req.params.id)
        .then(() => {
          return event.enroll(user, roleId);
        })
        .then(() => {
          res.json(Response(false, {}));
        })
        .catch(() => {
          res.status(404).json(Response(true, {}, Constants.EVENT_NOT_FOUND_MSG));
        });
    })
    .catch(() => {
      res.status(404).json(Response(true, {}, Constants.USER_NOT_FOUND_MSG));
    });
});

eventRouter.post('/:id/enrollUser', simpleAuthorization, (req, res) => {
  const roleId = req.body.role; // The role id that the user wants to enroll with

  // Load the logged user in a User object by the id
  const user = new User();
  user.loadById(req.body.userId)
    .then(() => {
      // Load the current event by the id
      const event = new Event();
      event.loadById(req.params.id)
        .then(() => {
          return event.enroll(user, roleId);
        })
        .then(() => {
          res.json(Response(false, {}));
        })
        .catch(() => {
          res.status(404).json(Response(true, {}, Constants.EVENT_NOT_FOUND_MSG));
        });
    })
    .catch(() => {
      res.status(404).json(Response(true, {}, Constants.USER_NOT_FOUND_MSG));
    });
});

/**
 * Returns all user entities + permissions + menus generated by the modules based on
 * user roles in the event
 * @param id event's id
 */
eventRouter.get('/:id/context', simpleAuthorization, (req, res) => {
  const user = new User();
  user.loadById(res.locals.user._id)
    .then(() => {
      const event = new Event();

      event.loadById(req.params.id)
        .then(() => event.getUserContext(user))
        .then((context) => {
          res.json(Response(false, context));
        })
        .catch(() => res.status(404).json(Response(true, {}, Constants.EVENT_NOT_FOUND_MSG)));
    });
});

/**
 * Actives or reactivate a module in the event
 * @param id event's id
 * @param slug module identification
 *
 * TODO: add authorization for admin only
 */
eventRouter.get('/:id/module/:slug/active', (req, res) => {
  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      return event.activeModule(req.params.slug);
    })
    .then(() => {
      res.json(Response(false, {}));
    })
    .catch(() => {
      res.json(Response(true, {}));
    });
});

/**
 * Deactivate a module from the event
 * @param id event's id
 * @param slug module identification
 *
 * TODO: add authorization for admin only
 */
eventRouter.get('/:id/module/:slug/deactivate', (req, res) => {
  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      return event.deactivateModule(req.params.slug);
    })
    .then(() => {
      res.json(Response(false, {}));
    })
    .catch(() => {
      res.json(Response(true, {}));
    });
});

eventRouter.get('/:id/news/all', (req, res) => {
  const eventId = req.params.id;
  const event = new Event();
  event.loadById(eventId)
    .then(() => event.getModule('news'))
    .then((module) => {
      res.json(Response(false, module.moduleObject.ofObjects.reverse()));
    })
    .catch(() => { res.json(Response(true, {})); });
});

eventRouter.get('/:id/gts/all', (req, res) => {
  const eventId = req.params.id;
  const event = new Event();
  event.loadById(eventId)
    .then(() => ThematicGroupArea.getAreasByEventId(eventId))
    .then((areas) => {
      event.getModule('thematicgroups')
        .then((thematicGroups) => {
          let newAreas = [];
          new Promise((resolve, reject) => {
            ModuleObject.populate(thematicGroups.moduleObject.ofObjects, [
              { path: 'data.coordinators', select: 'name email', model: 'User' },
            ], (err, docs) => {
              if (err) reject();
              resolve(docs);
            });
          })
            .then((docs) => {
              areas.forEach((area) => {
                let newArea = area;
                const allTgs = docs.map(tg => tg.data);
                let tgs = allTgs.filter(tg => tg.area == area.id);
                tgs = tgs.map((tg) => {
                  const coordsString = tg.coordinators.reduce(
                    (previousValue, currentValue, index) => {
                      let coords = `${previousValue}${currentValue.name}`;
                      if (index < tg.coordinators.length - 1) {
                        coords = `${coords}, `;
                      }
                      return coords;
                    }, '');

                  return ({
                    name: tg.name,
                    syllabus: tg.description,
                    coordinators: coordsString,
                  });
                });
                newAreas.push({ name: newArea.name, tgs });
              });
              res.json(Response(false, newAreas.reverse()));
            });
        })
        .catch(() => { res.json(Response(true, {})); });
    })
    .catch(() => { res.json(Response(true, {})); });
});

/**
 * Emit certificates
 */
eventRouter.post('/:id/emitCertificates/:type', simpleAuthorization, (req, res) => {
  const event = new Event();
  const user = new User();
  user.loadById(res.locals.user._id)
    .then(() => event.loadById(req.params.id))
    .then(() => {
      const roles = event.getUserRelationships(res.locals.user._id).roles;
      const isCoordinator = roles.reduce((prev, curr) => (prev || curr.name === 'Coordenador'), false);

      if (isCoordinator) {
        event.emitCertificates(req.params.type)
          .then((response) => {
            res.json(Response(false, response));
          }).catch((errMsg) => {
            res.json(Response(true, {}, errMsg));
          });
      } else {
        res.json(Response(true, {}, 'Permissão Negada'));
      }
    });
});

/**
 * Executes a action in a module of the event
 * @param id event's id
 * @param slug module slug identification
 * @param entity relacted entity of the module
 * @param subaction action that the user wants to exec
 */
eventRouter.post('/:id/module/:slug/:entity/act/:subaction', simpleAuthorization, (req, res) => {
  const eventId = req.params.id;
  const moduleSlug = req.params.slug;
  const entity = req.params.entity;
  const subaction = req.params.subaction;
  const body = req.body;

  const event = new Event();
  const user = new User();
  user.loadById(res.locals.user._id)
    .then(() => event.loadById(eventId))
    .then(() => event.getModule(moduleSlug))
    .then((module) => {
      const roles = event.getUserRelationships(String(user.userObject._id)).roles;
      return module.act(user, roles, body, entity, subaction, event);
    })
    .then((response) => {
      res.json(Response(false, response));
    })
    .catch((e) => { console.error(e); res.json(Response(true, {}, e)); });
});

/**
 * This is a public route that return certification based on a object (used by submission)
 * @param type means the kind of cert (example: presentation, participation)
 */
eventRouter.get('/:id/module/:slug/:entity/cert/:type/:object', (req, res) => {
  const eventId = req.params.id;
  const moduleSlug = req.params.slug;
  const entity = req.params.entity;
  const certType = req.params.type;
  const object = req.params.object;

  const event = new Event();
  event.loadById(eventId)
    .then(() => event.getModule(moduleSlug))
    .then((module) => {
      return module.getCertificate(entity, certType, object);
    })
    .then((response) => {
      res.json(Response(false, response));
    })
    .catch((e) => { console.error(e); res.json(Response(true, {})); });
});

eventRouter.get('/cert/:code', (req, res) => {
  const code = req.params.code;

  CertConn.find({ code }, (err, docs) => {
    if (err) res.json(Response(true, {}, 'Erro no banco de dados'));
    if (docs.length > 0) {
      const our = docs[0];
      const event = new Event();
      event.loadById(our.event)
        .then(() => {
          if (our.module) {
            // its a module managed cert
            event.getModule(our.module)
              .then((module) => {
                if (our.module === 'submission') {
                  return module.getCertificate(our.entity, our.certType, our.object);
                }
                if (our.module === 'activities') {
                  return module.getCertificate(our.entity, our.certType, our.object, our.user);
                }
                if (our.module === 'cert') {
                  return module.getCertificate(our.object);
                }
                return null;
              })
              .then((certResponse) => {
                res.json(Response(false, certResponse));
              })
              .catch((e) => { res.json(Response(true, {}, e)); });
          } else {
            // its a event cert
            event.getCertificate(our.user, our.certType)
              .then((certResponse) => {
                res.json(Response(false, certResponse));
              })
              .catch((e) => { res.json(Response(true, {}, e)); });
          }
        });
    } else {
      res.json(Response(true, {}, 'Certificado não encontrado'));
    }
  });

  // carregar de cert conn
  // decodificar evento
  // decodificar modulo
  // chamar a rota do modulo responsável
});

/**
 * Find a enrolled user with a email
 */
eventRouter.post('/:id/findUser', simpleAuthorization, (req, res) => {
  const eventId = req.params.id;
  const event = new Event();
  const user = new User();
  const email = req.body.userEmail;

  user.loadByEmail(email)
    .then(() => event.loadById(eventId))
    .then(() =>
      new Promise((resolve, reject) => {
        const roles = event.getUserRelationships(String(user.userObject._id)).roles;
        if (roles.length > 0) {
          resolve({
            name: user.userObject.name,
            _id: user.userObject._id,
          });
        } else {
          reject();
        }
      }),
    )
    .then((userObj) => {
      res.json(Response(false, userObj));
    })
    .catch(() => res.json(Response(true, [], 'User not found')));
});

/**
 * Returns a event by ID
 * @param id event id to search for
 * @return event if found
 *
 * @MissingTests
*/
eventRouter.get('/:id', (req, res) => {
  const fields = (req.query.fields) ? req.query.fields : 'name,subtitle,eventPeriod,enrollmentPeriod,location,published,thumbnail';

  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      res.json(Response(false, event.toFormatedEvent(fields)));
    })
    .catch(() => {
      res.status(404).json(Response(true, {}, Constants.EVENT_NOT_FOUND_MSG));
    });
});

export default eventRouter;
