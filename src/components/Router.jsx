import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePageContainer from './home/HomePageContainer';
import RegisterContainer from './register/RegisterContainer';
import LoginPageContainer from './login/LoginPageContainer';
import DashboardContainer from './dashboard/DashboardContainer';
import EventPage from './event/EventPage';
import Error404 from './error/Error404';

const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePageContainer} />
    <Route exact path='/register' component={RegisterContainer} />
    <Route exact path='/login' component={LoginPageContainer} />
    <Route exact path='/dashboard' component={DashboardContainer} />
    <Route exact path='/event' component={EventPage} />
    <Route component={Error404} />
  </Switch>
);

export default Router;
