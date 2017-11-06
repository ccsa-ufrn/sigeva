import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OpenToEnrollBadge extends Component {

  render() {
    const now = new Date().getTime();
    const begin = Date.parse(this.props.enrollmentPeriod.begin);
    const end = Date.parse(this.props.enrollmentPeriod.end);
    if (begin < now) {
      if (end > now) {
        return (<span className="badge badge-primary" style={{backgroundColor:'#FF404E'}}>Inscrições abertas</span>);
      } else {
        return (<span className="badge badge-secondary">Inscrições encerradas</span>);
      }
    } else {
      return (<span className="badge badge-secondary">Inscrições de {this.props.enrollment}</span>);
    }
  }
}


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
            <i className="fa fa-calendar"></i> {this.props.period} <i className="fa fa-map-marker"></i> {this.props.location}{'\u00A0'}
            <OpenToEnrollBadge enrollment={this.props.enrollment} enrollmentPeriod={this.props.enrollmentPeriod} />
          </h6>
          <Link to={`/event/${this.props.id}`} className="btn btn-success">Acessar</Link>
        </div>
      </div>
    );
  }
}

export default EventCard;
