import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserIfNeed();
  }

  render() {
    if (!this.props.userSession.logged) {
      return (<Redirect to='/' />);
    } else {
      return (
        <div>
          <DashboardLayout />
          { this.props.userSession.logged_user !== null &&
          this.props.userSession.logged_user.name }
        </div>
      );
    }
  }
}

export default Dashboard;
