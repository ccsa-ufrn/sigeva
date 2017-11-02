import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import userSession from './userSession';
import event from './event';

const reducers = combineReducers({
  userSession,
  register,
  login,
  event,
});

export default reducers;
