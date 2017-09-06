import {Router} from 'express'
import Event from './Event'
import Response from '../Response';
import * as EventHelper from './EventHelper';

var eventRouter = Router();

// [MR] essa rota não deve existir
eventRouter.get('/', (req, res)=> {
	res.json({router: "event"});
})

//TODO: List only Events with active ON
// [MR] Você não pode oferecer em uma unica requisição a possibilidade de listar tudo de uma vez
//      Para uma aplicação grande isso é inviável.
eventRouter.get('/list_all', (req, res)=> {
   var event = new Event();
   event.listData(req, res); // [MR] não se deve passar parametros do Router para outra classe
})

// [MR] A rota deve ser /:id e não /find_one. Você vai carregar um usuário, não buscar
// [MR] Todas as respostas devem ser encapsuladas no Response()
//TODO:
eventRouter.get('/find_one', (req, res)=> {
   var event = new Event();
   var id = "59a43715934c45614b424f76"
   event.eventById(id, req, res);

})

// [MR] Falta documentação
eventRouter.post('/', (req, res)=> {
    var event = new Event();
    event.setData(req.body,res) // [MR] não pode passar parametro do router para classe
                                // [MR] esse res não é utilizado no método!
    .then(()=>{
        event.store()
        .then((data)=>{
            res.json(Response(false, data));
        }).catch((err)=>{
            res.json(Response(true, {}, err));
        });
    }).catch((data)=>{
        res.json(Response(true, data, "Erro ao fazer cadastro"));
    });
});


// [MR] Evite deixar o código poluído. Código comentado é lixo!
/*
//TODO
eventRouter.post('/create', (req, res)=> {
    var event = new Event();
    var data = req;
    event.setData(data);
    event.store();
    res.json({sucess: true});
})
eventRouter.get('/create_new', (req, res)=> {
    var event = new Event();
    var data = {name:"CIENTEC"};
    event.setData(data);
    event.store();
    res.json({sucess: true});
})
 subtitle: req.body.subtitle,
                active: req.body.active,
                eventPeriod: req.body.eventPeriod,
                registerPeriod: req.body.registerPeriod,
                createdAt: new Date()
*/

export default eventRouter;
