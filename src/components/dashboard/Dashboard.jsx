import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
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
          <DashboardLayout>
            <div className='row'>
              <div className='col-md-4'>
                <MainMenu />
              </div>
            </div>
          </DashboardLayout>
        </div>
      );
    }
  }
}

export default Dashboard;
