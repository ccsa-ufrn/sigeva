import React, { Component } from 'react';
import DashboardHeaderBarContainer from './DashboardHeaderBarContainer';

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DashboardHeaderBarContainer />
      </div>
    );
  }
}

export default DashboardLayout;
