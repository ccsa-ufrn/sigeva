import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './home/HomePage';
import RegisterPage from './register/RegisterPage';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/register" component={RegisterPage} />
  </Switch>
);

export default Router;
