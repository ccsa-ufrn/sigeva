import React, { Component } from 'react';

import SeeEnrollmentsContainer from './SeeEnrollmentsContainer';

class ReportModule extends Component {
  constructor(props) {
    super(props);

    if (this.props.reportContext.permissions.length > 0) {
      this.state = {initialAction: this.props.reportContext.permissions[0].action};
    } else {
      this.state = {initialAction: null};
    }
  }

  loadPermissionTab(action) {
    switch(action) {
      case 'see_all_enrollments':
        return <SeeEnrollmentsContainer />;
      default:
        return null;
    }
  }

  render() {
    return(
      <div className='event-dashboard-module'>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          {
            this.props.reportContext.permissions.map((perm) => {
              return (
                <li key={perm.action} className='nav-item'>
                  <a className={`nav-link ${this.state.initialAction == perm.action ? 'active': ''}`} id={`payment-${perm.action}-pill`} data-toggle='pill' href={`#paymet-${perm.action}-tab`} role="tab" aria-controls={`payment-${perm.action}`} aria-selected='true'>{perm.name}</a>
                </li>
              );
            })
          }
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {
            this.props.reportContext.permissions.map((perm) => {
              return (
                <div key={perm.action} className={`tab-pane fade ${this.state.initialAction == perm.action ? 'show active': ''}`} id={`paymet-${perm.action}-tab`} role="tabpanel" aria-labelledby={`paymet-${perm.action}-pill`}>
                  { this.loadPermissionTab(perm.action) }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default ReportModule;
