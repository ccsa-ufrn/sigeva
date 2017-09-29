import JWT from 'jsonwebtoken';

import Response from '../Response';
import { secret } from '../../../config';

/**
 * Authorization pre-router function
 */
export function simpleAuthorization(req, res, next) {
  if (req.cookies.sigeva_user_token) {
    // The authorization header is defined
    const token = req.cookies.sigeva_user_token;
    JWT.verify(token, secret, (err, decoded) => {
      if (!err) {
        res.locals.user = decoded;
        next();
      } else {
        res.status(403).json(Response(true, {}, 'Permissão negada'));
      }
    });
  } else {
    // The authorization header is not defined
    res.status(403).json(Response(true, {}, 'Permissão negada'));
  }
}
