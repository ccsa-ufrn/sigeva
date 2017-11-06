import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          {/* <p className="card-text">{this.props.description} [ <a href="#">ler mais</a> ]</p> */}
          <Link to={`/event/${this.props.id}`} className="btn btn-success">Acessar</Link> <a href="#" className="btn btn-success">Inscrever-se</a>
        </div>
      </div>
    );
  }
}

export default EventCard;
