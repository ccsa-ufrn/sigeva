import {Router} from 'express'
import * as UserHelper from './UserHelper';
import Response from '../Response';

import User from './User';

/** User Router
 * Defines API's routers to interact with users
 */

var userRouter = Router();

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

userRouter.get('/create_new', (req, res)=> {
	var user = new User();
	var data = {name: "Maradona42", email: "mr@hotmail.com", password: "senha"};
	user.setData(data);
	user.store();
	res.json({success: true});
})

export default userRouter;
