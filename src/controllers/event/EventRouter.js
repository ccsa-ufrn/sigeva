import { Router } from 'express';
import Event from './Event';
import User from '../user/User';
import Response from '../Response';
import { simpleAuthorization } from '../authorization/Authorization';
import * as Constants from './constants';

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
  const fields = (req.query.fields) ? req.query.fields : 'name,subtitle,location,eventPeriod,enrollmentPeriod,published';
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

/**
 * Returns a event by ID
 * @param id event id to search for
 * @return event if found
 *
 * @MissingTests
*/
eventRouter.get('/:id', (req, res) => {
  const fields = (req.query.fields) ? req.query.fields : 'name,subtitle,eventPeriod,enrollmentPeriod,location,published';

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
