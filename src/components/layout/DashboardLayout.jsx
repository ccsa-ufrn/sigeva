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
        <div className="container-fluid">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
