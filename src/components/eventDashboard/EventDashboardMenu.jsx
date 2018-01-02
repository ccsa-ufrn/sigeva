import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventDashboardMenuItem extends Component {
  render() {
    let linkTo = `${this.props.baseUrl}/${this.props.module.slug}/${this.props.entity.slug}`;
    if (!this.props.entity.slug) {
      linkTo = `${this.props.baseUrl}/${this.props.module.slug}`;
    }
    if (!this.props.module.slug) {
      linkTo = this.props.baseUrl;
    }
    return(
      <li className='nav-item'>
        <Link to={linkTo} className={`nav-link ${this.props.active}`}>
          {this.props.module.name} {' '}
          {this.props.entity.slug ? <i className='fa fa-long-arrow-right'></i> : '' } {' '}
          {this.props.entity.slug ? this.props.entity.name : '' }
        </Link>
      </li>
    );
  }
}

EventDashboardMenuItem.defaultProps = {
  active: '',
  entity: {
    name: '',
    slug: ''
  },
  module: {
    name: '',
    slug: '',
  }
};

class EventDashboardMenu extends Component {
  render() {
    return(
      <div>
        <div className="card">
          <div className='card-header'>
            <strong>{this.props.event.name}</strong>
          </div>
          <div className="card-body">
            <img src={this.props.event.thumbnail} width='100%'/>
          </div>
        </div>
        <ul className='nav flex-column event-dashboard-side-menu'>
          { this.props.children }
        </ul>
      </div>
    );
  }
};

export { EventDashboardMenuItem };
export default EventDashboardMenu;
