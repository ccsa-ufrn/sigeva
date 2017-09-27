import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import HeaderBar from '../HeaderBar';
import EventsBoard from './EventsBoard';
import LoginContainer from '../login/LoginContainer';
import FooterBar from '../FooterBar';

class HomePage extends Component {
  render() {
    if (this.props.logged) {
      return(<Redirect to='/dashboard' />);
    } else {
      return(
        <div>
          <HeaderBar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <EventsBoard />
              </div>
              <div className="col-md-4">
                <LoginContainer />
              </div>
            </div>
          </div>
          <FooterBar />
        </div>
      );
    }
  }
}

export default HomePage;
