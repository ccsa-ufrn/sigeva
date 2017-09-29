import React, { Component } from 'react';
import DashboardHeaderBar from './DashboardHeaderBar';

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DashboardHeaderBar />
      </div>
    );
  }
}

export default DashboardLayout;
