import { Router } from 'express';
import Response from '../Response';

import System from './System';

/**
 * System Router
 * Returns informations about system configurations
 */
const systemRouter = Router();

systemRouter.get('/register_fields_requests', (req, res) => {
  System.getRegisterFieldRequests()
    .then((fields) => {
      res.json(Response(false, fields));
    });
});

export default systemRouter;
