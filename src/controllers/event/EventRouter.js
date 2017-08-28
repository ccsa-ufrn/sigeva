import {Router} from 'express'
import Event from './Event'

/** Event Router
 * Defines API's routers to interact with events
 */

var eventRouter = Router();

eventRouter.get('/', (req, res)=> {
	res.json({router: "event"});
})


eventRouter.get('/create', (req, res)=> {
	var event = new Event();
	var data = {name: "Seminario CCSA"};
	event.setData(data);
	event.store();
	res.json({success: true});
})


export default eventRouter;
