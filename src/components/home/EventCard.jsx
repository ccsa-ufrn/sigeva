import React, { Component } from 'react';

class EventCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card event-card">
        <div className="card-body">
          <h4 className="card-title">{this.props.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            <i className="fa fa-calendar"></i> {this.props.period} <i className="fa fa-map-marker"></i> {this.props.location}
          </h6>
          <p className="card-text">{this.props.description} [ <a href="#">ler mais</a> ]</p>
          <a href="/event" className="btn btn-success">Acessar</a> <a href="#" className="btn btn-success">Inscrever-se</a>
        </div>
      </div>
    );
  }
}

export default EventCard;
