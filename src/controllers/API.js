import {Router} from 'express';
import Response from './Response';

// IMPORT ROUTERS
import userRouter from './user/UserRouter';
import eventRouter from './event/EventRouter';

/**
 * API
 * Defines API's routers
 */
var APIrouter = Router(); // Create a new router instance

// Main route
APIrouter.get('/', (req, res) => {
	res.json({foo: "bar"});
});

APIrouter.use('/user', userRouter); // Set userRouter to /api/user
APIrouter.use('/event', eventRouter); // Set eventRouter to /api/router

// Throw 404 error for API's requests when got the end of API
APIrouter.all('*', (req, res)=>{
    res.status(404);
    res.json(Response(true, {}, "This request was not handled by any route"));
});

export default APIrouter;
