import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './home/HomePage';
import RegisterContainer from './register/RegisterContainer';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/register" component={RegisterContainer} />
  </Switch>
);

export default Router;
