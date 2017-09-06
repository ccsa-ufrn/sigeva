import React, { Component } from 'react';
import EventCard from './EventCard';

class EventsBoard extends Component {
  render() {
    return(
      <div id="events-board">
        <ul className="nav nav-tabs" id="events-board-tabs" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="actual-events-tab" data-toggle="tab" href="#actual" role="tab" aria-controls="actual-events" aria-expanded="true">Eventos disponíveis</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="past-events-tab" data-toggle="tab" href="#past" role="tab" aria-controls="past-events">Eventos passados</a>
          </li>
        </ul>
        <div className="tab-content" id="events-board-content">
          <div className="tab-pane fade show active" id="actual" role="tabpanel" aria-labelledby="actual-events-tab">
            <EventCard />
          </div>
          <div className="tab-pane fade" id="past" role="tabpanel" aria-labelledby="past-events-tab">...2</div>
        </div>
      </div>
    );
  }
}

export default EventsBoard
