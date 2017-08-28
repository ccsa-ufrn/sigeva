import {Router} from 'express'
import Event from './Event'

/** Event Router
 * Defines API's routers to interact with events
 */

var eventRouter = Router();

eventRouter.get('/', (req, res)=> {
	res.json({router: "event"});
})

eventRouter.get('/disable', (req, res)=> {
    res.json({router: "event disable"});
})


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
