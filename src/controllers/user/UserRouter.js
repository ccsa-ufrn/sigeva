import {Router} from 'express'
import User from './User'

/** User Router
 * Defines API's routers to interact with users
 */

var userRouter = Router();

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
