import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import userSession from './userSession';
import event from './event';
import eventsBoard from './eventsBoard';
import payment from './payment';
import thematicGroupsAreas from './thematicGroupsAreas';

const reducers = combineReducers({
  userSession,
  register,
  login,
  event,
  eventsBoard,
  payment,
  thematicGroupsAreas,
});

export default reducers;
