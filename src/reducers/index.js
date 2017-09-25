import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import userSession from './userSession';

const reducers = combineReducers({
  userSession,
  register,
  login,
});

export default reducers;
