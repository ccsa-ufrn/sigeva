import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import userSession from './userSession';
import event from './event';
import eventsBoard from './eventsBoard';
import payment from './payment';
import thematicGroupsAreas from './thematicGroupsAreas';
import thematicGroups from './thematicGroups';
import submission from './submission';

const reducers = combineReducers({
  userSession,
  register,
  login,
  event,
  eventsBoard,
  payment,
  thematicGroupsAreas,
  thematicGroups,
  submission,
});

export default reducers;
