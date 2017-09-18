import { Router } from 'express';
import Event from './Event';
import Response from '../Response';
import * as EventHelper from './EventHelper';
import EventModel from '../../models/event.model';

const eventRouter = Router();

const eventFieldsParse = (fields) => {
  let fieldsStr = '';
  const fieldsArray = fields.split(',');
  fieldsArray.forEach((f) => {
    fieldsStr = fieldsStr.concat(f);
    fieldsStr = fieldsStr.concat(' ');
  });
  return fieldsStr;
};

/*
 * Retorna eventos
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

// [MR] A rota deve ser /:id e não /find_one. Você vai carregar um usuário, não buscar
// [MR] Todas as respostas devem ser encapsuladas no Response()

/*
eventRouter.get('/id', (req, res) => {
  const event = new Event();
  const id = '59a43715934c45614b424f76';
  event.loadById(id, req, res);
});*/

eventRouter.get('/teste', (req, res) => {
  const event = new Event();
  event.teste(req, res);
});
/**
 * Create a new event
 * @param fields representing a event
 * @return Created event object
 */
eventRouter.post('/', (req, res) => {
  const event = new Event();
  event.setData(req.body, res) // [MR] não pode passar parametro do router para classe
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
