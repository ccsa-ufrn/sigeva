import { Router } from 'express';
import Event from './Event';
import Response from '../Response';

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
      res.status(400).json(Response(true, data, 'Erro ao fazer cadastro'));
    });
});

/*
 * @return a list of events
*/
eventRouter.get('/', (req, res) => {
  const page = (req.query.page) ? parseInt(req.query.page, 10) : 1;
  const count = (req.query.count) ? parseInt(req.query.count, 10) : 5;
  const query = (req.query.query) ? req.query.query : '';
  const fields = (req.query.fields) ? req.query.fields : 'name,subtitle,location,eventPeriod,enrollmentPeriod,published';
  const order = (req.query.order) ? req.query.order : '-createdAt'; // News events first
  const published = (req.query.published) ? req.query.published : true;
  // By default returns publisheds events

  // const event = new Event();
  Event.loadEvents(page, count, query, fields, order, published)
    .then((eventSet) => {
      res.json(Response(false, eventSet));
    });
});

/**
 * Returns a event by ID
 * @param id event id to search for
 * @return event if found
*/
eventRouter.get('/:id', (req, res) => {
  const fields = (req.query.fields) ? req.query.fields : 'name,subtitle,eventPeriod,enrollmentPeriod,location,published';

  const event = new Event();
  event.loadById(req.params.id)
    .then(() => {
      res.json(Response(false, event.toFormatedEvent(fields)));
    })
    .catch(() => {
      res.json(Response(true, {}, 'Não existe evento com este ID'));
    });
});

export default eventRouter;
