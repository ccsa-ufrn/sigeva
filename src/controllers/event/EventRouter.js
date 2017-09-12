import { Router } from 'express';
import Event from './Event';
import Response from '../Response';
import * as EventHelper from './EventHelper';

const eventRouter = Router();

// [MR] Você não pode oferecer em uma unica requisição a possibilidade de listar tudo de uma vez
//      Para uma aplicação grande isso é inviável.
eventRouter.get('/list_all', (req, res) => {
  const event = new Event();
  event.listData(req, res); // [MR] não se deve passar parametros do Router para outra classe
});

// [MR] A rota deve ser /:id e não /find_one. Você vai carregar um usuário, não buscar
// [MR] Todas as respostas devem ser encapsuladas no Response()

eventRouter.get('/id', (req, res) => {
  const event = new Event();
  const id = '59a43715934c45614b424f76';
  event.loadById(id, req, res);
});

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
