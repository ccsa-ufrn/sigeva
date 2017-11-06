import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import MainHeaderBar from '../layout/MainHeaderBar';
import EventsBoardContainer from '../eventsBoard/EvenstBoardContainer';
import LoginContainer from '../login/LoginContainer';

class HomePage extends Component {
  render() {
    if (this.props.logged) {
      return(<Redirect to='/dashboard' />);
    } else {
      return(
        <MainLayout>
          <div className='row'>
            <div className='col-md-8'>
              <EventsBoardContainer />
            </div>
            <div className='col-md-4'>
              <LoginContainer />
            </div>
          </div>
        </MainLayout>
      );
    }
  }
}

export default HomePage;
