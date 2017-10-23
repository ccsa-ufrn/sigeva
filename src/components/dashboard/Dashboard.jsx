import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import MainMenu from './MainMenu';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUserIfNeed();
  }

  render() {
    if (!this.props.userSession.logged) {
      return (<Redirect to='/' />);
    } else {
      return (
        <div>
          <MainLayout>
            <div className='row'>
              <div className='col-md-4'>
                <MainMenu />
              </div>
            </div>
          </MainLayout>
        </div>
      );
    }
  }
}

export default Dashboard;
