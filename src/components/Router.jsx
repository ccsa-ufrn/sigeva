import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePageContainer from './home/HomePageContainer';
import RegisterContainer from './register/RegisterContainer';
import LoginPageContainer from './login/LoginPageContainer';
import DashboardContainer from './dashboard/DashboardContainer';
import EventPageContainer from './event/EventPageContainer';
import EventDashboardPageContainer from './eventDashboard/EventDashboardPageContainer';
import MainPassReset from './passReset/MainPassReset';
import PassResetForm from './passReset/PassResetForm';
import DropzoneTest from './dropzone/DropzoneTest';
import Error404 from './error/Error404';

const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePageContainer} />
    <Route exact path='/register' component={RegisterContainer} />
    <Route exact path='/login' component={LoginPageContainer} />
    <Route exact path='/dashboard' component={DashboardContainer} />
    <Route exact path='/passReset' component={MainPassReset} />
    <Route exact path='/passResetForm' component={PassResetForm} />
    <Route exact path='/event/:id/dashboard/' component={EventDashboardPageContainer} />
    <Route exact path='/event/:id/dashboard/:module' component={EventDashboardPageContainer} />
    <Route exact path='/event/:id/dashboard/:module/:entity' component={EventDashboardPageContainer} />
    <Route exact path='/event/:id' component={EventPageContainer} />
    <Route exact path='/dropzone/:id' component={DropzoneTest} />
    <Route component={Error404} />
  </Switch>
);

export default Router;
