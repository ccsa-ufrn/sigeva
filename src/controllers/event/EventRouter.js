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
  const count = (req.query.c) ? parseInt(req.query.c, 10) : 10;
  const query = (req.query.q) ? req.query.q : '{}';
  const fields = (req.query.f) ? req.query.f : 'name, subtitle, active, eventPeriod, registerPeriod'; /* retorna ID por padrão */
  const sort = (req.query.o) ? req.query.o : '{}';

  /* Converte entrada (field1,field2)->(field1 field2) */
  const fieldsStr = eventFieldsParse(fields);

  console.log('page ', page);
  console.log('coutn ', count);
  console.log('query ', query);
  console.log('fields', fields);
  console.log('sort', sort);
  console.log('fieldsStr ', fieldsStr);


  let queryObj;
  try {
    queryObj = JSON.parse(query);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
    return;
  }
  let sortObj;
  try {
    sortObj = JSON.parse(sort);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
    return;
  }
  let skipNum = 0;
  if (page > 1) {
    skipNum = (page - 1) * count;
  }

  console.log('queryObj', queryObj);
  console.log('sortObj ', sortObj);
  console.log('skipNum ', skipNum);

  EventModel
    .find(queryObj, fieldsStr, { skip: skipNum })
    .sort(sortObj)
    .limit(count)
    .then((docs) => {
      res.json(docs);
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
      res.json(usr);
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
