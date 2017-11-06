import React, { Component } from 'react';

import EventDashLayout from '../layout/EventDashLayout';
import EventDashboardMenu, { EventDashboardMenuItem } from './EventDashboardMenu';
import Module from './Module';

class EventDashboardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
