import React, { Component } from 'react';

class EventCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 class="card-title">Nome do evento</h4>
          <h6 class="card-subtitle mb-2 text-muted">Horários | Local</h6>
          <p class="card-text">Descrição do evento.</p>
          <a href="#" class="card-link">Inscrever-se</a>
        </div>
      </div>
    );
  }
}

export default EventCard;
