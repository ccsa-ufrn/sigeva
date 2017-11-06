import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import userSession from './userSession';
import event from './event';
import eventsBoard from './eventsBoard';

const reducers = combineReducers({
  userSession,
  register,
  login,
  event,
  eventsBoard,
});

export default reducers;
