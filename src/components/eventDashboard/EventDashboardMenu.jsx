import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventDashboardMenuItem extends Component {
  render() {
    return(
      <li className='nav-item'>
        <Link to={this.props.link} className={`nav-link ${this.props.active}`}>{this.props.name}</Link>
      </li>
    );
  }
}

EventDashboardMenuItem.defaultProps = {
  active: ''
};

class EventDashboardMenu extends Component {
  render() {
    return(
      <div>
        <ul className='nav flex-column event-dashboard-side-menu'>
          { this.props.children }
        </ul>
      </div>
    );
  }
};

export { EventDashboardMenuItem };
export default EventDashboardMenu;
