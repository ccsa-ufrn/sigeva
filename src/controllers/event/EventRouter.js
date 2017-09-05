import {Router} from 'express'
import Event from './Event'
import Response from '../Response';
import * as EventHelper from './EventHelper';

var eventRouter = Router();

eventRouter.get('/', (req, res)=> {
	res.json({router: "event"});
})

//TODO: List only Events with active ON
eventRouter.get('/list_all', (req, res)=> {
   var event = new Event();
   event.listData(req, res);
})

//TODO:
eventRouter.get('/find_one', (req, res)=> {
   var event = new Event();
   var id = "59a43715934c45614b424f76"
   event.eventById(id, req, res);

})


eventRouter.post('/', (req, res)=> {
    var event = new Event();
    event.setData(req.body,res)
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
