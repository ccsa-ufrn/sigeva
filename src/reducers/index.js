import { combineReducers } from 'redux';
import register from './register';
import login from './login';

const reducers = combineReducers({
  register,
  login,
});

export default reducers;
