import { Router } from 'express';
import * as UserHelper from './UserHelper';
import Response from '../Response';

import User from './User';

/**
 * User Router
 * Defines API's routers to interact with users
 */

const userRouter = Router();

/**
 * Create a new user
 * @param fields representing a user
 * @return Created user object
 */
userRouter.post('/', (req, res) => {
  const user = new User();
  user.setData(req.body)
    .then(() => {
      user.store()
        .then((data) => {
          res.json(Response(false, data));
        }).catch((err) => {
          res.json(Response(true, {}, err));
        });
    }).catch((data) => {
      res.json(Response(true, data, 'Erro ao fazer cadastro'));
    });
});

/**
 * Get user by ID
 * @param field user fields to be returned in request
 * @return User Object
 */
userRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  // const fields = (req.query.fields) ? req.query.fields : '_id'; /* returns ID by default */
  // const fieldsStr = UserHelper.parse(fields);

  /* let user = new User(id);
let data = user.getFields(fieldsStr);
res.json(Response(true, data)); */
  const user = new User();
  user.loadById(id)
    .then(() => {
      const formatedUser = user.toFormatedUser();
      res.json(Response(false, formatedUser));
    })
    .catch(() => {
      res.json(Response(true, {}, 'Usuário não encontrado'));
    });
});

export default userRouter;
