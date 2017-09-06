import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './home/HomePage';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
  </Switch>
);

export default Router;
