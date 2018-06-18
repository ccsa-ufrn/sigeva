import React, { Component } from 'react';

class EventDashboardHome extends Component {
  render() {
    return(
      <div className='event-dashboard-module row'>
        <div className='col-md-12'>
          <div className='alert alert-info' role='alert'>
            Bem vindo ao evento <strong>{this.props.event.name}</strong>. Suas relações com este evento são:
            <strong>
            { this.props.roles &&
            this.props.roles.map((role) => { return ` ${role.name}` })
            }
            </strong>
          </div>
          { this.props.event.cert &&
            <div>
              <a className='btn btn-primary' href={`/certificado/${this.props.event.cert}`} target='blank_'>Certificado de participação no evento</a><br/><br/>
              <strong>Observação:</strong> os certificados de apresentações de trabalhos e participação em atividades ficam localizados no módulo de cada tipo de
              ação.
            </div>
          }
        </div>

      </div>
    );
  }
}

export default EventDashboardHome;
