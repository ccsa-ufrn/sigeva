import {Router} from 'express'
import * as UserHelper from './UserHelper';
import Response from '../Response';

import User from './User';

/** User Router
 * Defines API's routers to interact with users
 */

var userRouter = Router();

/**
 * Create a new user
 * @param fields representing a user
 * @return Created user object
 */
userRouter.post('/', (req, res)=> {
	var user = new User();
	user.setData(req.body)
	.then((data)=>{
		//user.store(); // TODO Promisefy .store()
		res.json(Response(false, data));
	}).catch((data)=>{
		res.json(Response(true, {}, data.error));
	});
});

/**
 * Get user by ID
 * @param field user fields to be returned in request
 * @return User Object
 */
userRouter.get('/:id', (req, res)=> {
	const id = req.params.id;
	const fields =  (req.query.fields) ? req.query.fields : '_id'; /* returns ID by default */

	const fieldsStr = UserHelper.parse(fields);

	/* let user = new User(id);
	let data = user.getFields(fieldsStr);
	res.json(Response(true, data));*/
	res.json(Response(true, {}, "There's a error"))
})

userRouter.get('/', (req, res)=> {
	res.json({router: "user"});
})

export default userRouter;
