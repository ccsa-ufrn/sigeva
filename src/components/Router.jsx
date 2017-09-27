import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePageContainer from './home/HomePageContainer';
import RegisterContainer from './register/RegisterContainer';
import Error404 from './error/Error404';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomePageContainer} />
    <Route exact path="/register" component={RegisterContainer} />
    <Route component={Error404} />
  </Switch>
);

export default Router;
