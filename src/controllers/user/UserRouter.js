import { Router } from 'express';
import JWT from 'jsonwebtoken';
import Response from '../Response';
import { secret } from '../../../config';

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
 * Authorizes a user generating a access token
 * @param email user email passed by post body
 * @param password user password passed by post body
 */
userRouter.post('/authorize', (req, res) => {
  const email = req.body.email; // user passed email
  const password = req.body.password; // user passed password

  const user = new User();
  user.authorize(email, password)
    .then((authorized) => {
      if (authorized) {
        // User was authorized
        const tokenData = {
          _id: user.userObject._id,
          ofTypes: user.userObject.ofTypes,
        };
        // Creates a JWT to grant user access
        const token = JWT.sign(tokenData, secret, {
          expiresIn: '24h', // The token expires in 24 hours
        });
        res.json(Response(false, { authorized, token }));
      } else {
        // Passed password is incorrect
        res.json(Response(true, {}, 'Senha incorreta'));
      }
    })
    .catch(() => {
      // The user with passed email doesn't exists
      res.json(Response(true, {}, 'Não existe usuário com este email'));
    });
});

/**
 * Get user by ID
 * @param field user fields to be returned in request
 * @return User Object
 */
userRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const fields = (req.query.f) ? req.query.f : '_id'; /* return id by default */

  const user = new User(); // Create a user instance
  user.loadById(id) // Load the user by the passed ID
    .then(() => {
      // there is a user with that ID
      user.toFormatedUser(fields) // Format it
        .then((formatedUser) => {
          res.json(Response(false, formatedUser));
        })
        .catch(() => {
          res.json(Response(true, {}, 'Erro ao formatar usuário'));
        });
    })
    .catch(() => {
      // there is not a user with that ID, display error message
      res.json(Response(true, {}, 'Usuário não encontrado'));
    });
});

export default userRouter;
