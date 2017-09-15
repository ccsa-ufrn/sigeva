import React, { Component } from 'react';
import EventCard from './EventCard';

class EventsBoard extends Component {
  render() {
    return(
      <div className="card board" id="events-board">
        <div className="card-header">Eventos ativos</div>
        <div className="card-body event-board-body">
          <EventCard name="XXII Seminário de Pesquisa" period="2 a 4 de maio" location="Setor V - UFRN" description="Descrição do evento" />
          <EventCard name="XXII Seminário de Pesquisa" period="2 a 4 de maio" location="Setor V - UFRN" description="Descrição do evento" />
          <EventCard name="XXII Seminário de Pesquisa" period="2 a 4 de maio" location="Setor V - UFRN" description="Descrição do evento" />
        </div>
      </div>
    );
  }
}

export default EventsBoard;
