import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import MainMenuContainer from './MainMenuContainer';
import EventsBoardContainer from '../eventsBoard/EvenstBoardContainer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.userSession.logged) {
      this.props.loadUserIfNeed();
    } else {
      this.props.reloadUser();
    }
  }

  render() {
    if (!this.props.userSession.logged) {
      return (<Redirect to='/' />);
    } else {
      return (
        <div>
          <MainLayout>
            <div className='row'>
              <div className='col-md-8'>
                <EventsBoardContainer />
              </div>
              <div className='col-md-4'>
                <MainMenuContainer />
              </div>
            </div>
          </MainLayout>
        </div>
      );
    }
  }
}

export default Dashboard;
