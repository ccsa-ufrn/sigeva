import {Router} from 'express'
import Event from './Event'

/** Event Router
 * Defines API's routers to interact with events
 */

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

//TODO
eventRouter.post('/create', (req, res)=> {
	var event = new Event();
    var data = req;
	event.setData(data);
    event.store();
    res.json({sucess: true});
})



/*
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
