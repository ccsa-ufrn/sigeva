import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import EventDashLayout from '../layout/EventDashLayout';
import EventDashboardMenu, { EventDashboardMenuItem } from './EventDashboardMenu';
import Module from './Module';

class EventDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.userContainsEvent = this.userContainsEvent.bind(this);
  }

  userContainsEvent() {
    if (this.props.userSession.logged_user) {
      const event = this.props.userSession.logged_user.ofEvents.find((event) => {
        return event._id == this.props.match.params.id;
      });
      return event !== undefined;
    }
  }

  componentDidMount() {
    this.props.loadUserIfNeed();
  }

  render() {
    if (!this.props.userSession.logged || !this.userContainsEvent()) {
      return (<Redirect to='/' />);
    }
    return (
      <EventDashLayout>
        <div className='row'>
          <div className='col-md-3'>
            <EventDashboardMenu>
              <EventDashboardMenuItem name='Pagamento' link='/payment' />
              <EventDashboardMenuItem name='Artigo' link='/submission/paper' />
              <EventDashboardMenuItem name='Pôster' link='/submission/poster' />
              <EventDashboardMenuItem name='Minicurso' link='/activity/minicourse' />
              <EventDashboardMenuItem name='Oficina' link='/activity/workshop' />
              <EventDashboardMenuItem name='Mesa-redonda' link='/activity/roundtable' />
              <EventDashboardMenuItem name='Conferência' link='/activity/conference' />
            </EventDashboardMenu>
          </div>
          <div className='col-md-9'>
            <Module/>
          </div>
        </div>
      </EventDashLayout>
    );
  }
}

export default EventDashboardPage;
