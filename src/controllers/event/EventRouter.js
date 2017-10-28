import { Router } from 'express';
import Event from './Event';
import Response from '../Response';
import * as EventHelper from './EventHelper';
import EventModel from '../../models/event.model';

const eventRouter = Router();

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

/*
 * Retorna um usuário com o ID
 * @param id for seach
 * @return event if found
*/
eventRouter.get('/:id', (req, res) => {
  const fields = (req.query.f) ? req.query.f : 'name, subtitle, active, eventPeriod, registerPeriod'; /* retorna ID por padrão */
  const fieldsStr = eventFieldsParse(fields);
  EventModel
    .findById(req.params.id, fieldsStr)
    .then((usr) => {
      res.json(Response(false, usr));
    });
});

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
        .then((data) => {
          res.json(Response(false, data));
        }).catch((err) => {
          res.json(Response(true, {}, err));
        });
    }).catch((data) => {
      res.json(Response(true, data, 'Erro ao fazer cadastro'));
    });
});

export default eventRouter;
