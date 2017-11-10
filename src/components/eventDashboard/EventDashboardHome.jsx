import React, { Component } from 'react';

class EventDashboardHome extends Component {
  render() {
    return(
      <div className='event-dashboard-module row'>
        <div className='col-md-12'>
          <div className='alert alert-info' role='alert'>
            Bem vindo ao <strong>{this.props.event.name}</strong>. Suas relações com este evento são:
            <strong>
            { this.props.roles &&
            this.props.roles.map((role) => { return ` ${role.name}` })
            }
            </strong>
          </div>
        </div>

      </div>
    );
  }
}

export default EventDashboardHome;
