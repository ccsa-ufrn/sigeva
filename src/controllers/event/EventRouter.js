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
          console.log(err);
          res.json(Response(true, {}, err));
        });
    }).catch((data) => {
      res.json(Response(true, data, 'Erro ao fazer cadastro'));
    });
});

/*
 * @return a list of events
*/
eventRouter.get('/', (req, res) => {
  const page = (req.query.p) ? parseInt(req.query.p, 10) : 1;
  const count = (req.query.c) ? parseInt(req.query.c, 10) : 5;
  const query = (req.query.q) ? req.query.q : '';
  const fields = (req.query.f) ? req.query.f : 'name,subtitle,active,eventPeriod,registerPeriod'; /* retorna ID por padrão */
  const sort = (req.query.o) ? req.query.o : '{}';
  //const search = (req.query.s) ? req.query.s : '{}';
  const event = new Event();
  event.loadEvents(req, res, page, count, query, fields, sort)
  .then((event) => {
    res.json(Response(false, event));
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
