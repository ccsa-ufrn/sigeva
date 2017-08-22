import {Router} from 'express'

/** User Router
 * Defines API's routers to interact with users
 */

var userRouter = Router();

userRouter.get('/', (req, res)=> {
	res.json({router: "user"});
})

export default userRouter;
