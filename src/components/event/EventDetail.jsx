import React, { Component } from 'react'


class EventDetailHeader extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
        <div className='card board'>
            <div className='card-header'>
              Informações sobre o Evento
            </div>
            <div className='card-body'>
              {this.props.children}
            </div>
        </div>
        )
    }
}

class EventDetail extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <EventDetailHeader>
              <div className='row'>
                <div className='col-md-5'>
                <img className="img-fluid" src='https://seminario.ccsa.ufrn.br/assets/ng2/marca.png' /> <br /> <br />
                  <span>Inscrições: {this.props.event.readableEnrollmentPeriod}</span> <br/>
                  <span>Período: {this.props.event.readableEventPeriod} </span> <br />
                  <span>Local: {this.props.event.location} </span>
                </div>
                <div className='col-md-7'>
                <p>{this.props.event.description} </p>
                </div>
               </div>
            </EventDetailHeader>
        )
    }
}

export default EventDetail


