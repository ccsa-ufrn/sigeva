import { Router } from 'express';
import Response from './Response';

// IMPORT ROUTERS
import userRouter from './user/UserRouter';
import eventRouter from './event/EventRouter';
import systemRouter from './system/SystemRouter';

/**
 * API
 * Defines API's routers
 */
const APIrouter = Router(); // Create a new router instance

// Main route - Just a Rick and Morty stub quote
APIrouter.get('/', (req, res) => {
  res.json({
    rick: 'wubba lubba dub dub',
  });
});

APIrouter.use('/user', userRouter); // Set userRouter to /api/user
APIrouter.use('/event', eventRouter); // Set eventRouter to /api/router
APIrouter.use('/system', systemRouter); // Set systemRouter to /api/system

// Throw 404 error for API's requests when got the end of API
APIrouter.all('*', (req, res) => {
  res.status(404);
  res.json(Response(true, {}, 'This request was not handled by any route'));
});

export default APIrouter;
