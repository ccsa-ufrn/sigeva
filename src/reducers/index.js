import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import userSession from './userSession';
import event from './event';
import eventsBoard from './eventsBoard';
import payment from './payment';

const reducers = combineReducers({
  userSession,
  register,
  login,
  event,
  eventsBoard,
  payment,
});

export default reducers;
