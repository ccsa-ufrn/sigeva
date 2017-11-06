import React, { Component } from 'react';
import EventCard from './EventCard';

class EventsBoardEdge extends Component {
  render() {
    return(
      <div className="card board" id="events-board">
        <div className="card-header">Eventos ativos</div>
        <div className="card-body event-board-body">
          { this.props.children }
        </div>
      </div>
    );
  }
}

class EventsBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    // return(
    //       {/* <EventCard id="28fj3282d" name="XXII Seminário de Pesquisa" period="2 a 4 de maio" location="Setor V - UFRN" description="Descrição do evento" /> */}
    //       <EventCard name="XXII Seminário de Pesquisa" period="2 a 4 de maio" location="Setor V - UFRN" description="Descrição do evento" />
    //       <EventCard name="XXII Seminário de Pesquisa" period="2 a 4 de maio" location="Setor V - UFRN" description="Descrição do evento" />

    // );

    if (this.props.eventsBoard.error) {
      return (
        <EventsBoardEdge>Erro ao carregar eventos</EventsBoardEdge>
      );
    } else if (this.props.eventsBoard.loading) {
      return (
        <EventsBoardEdge>Carregando eventos...</EventsBoardEdge>
      );
    } else {
      if (this.props.eventsBoard.events.length === 0) {
        return (
          <EventsBoardEdge>Nenhum evento ativo atualmente</EventsBoardEdge>
        );
      } else {
        return (
          <EventsBoardEdge>
            {
              this.props.eventsBoard.events.map((event) => {
                return (<EventCard
                  key={event._id}
                  id={event._id}
                  name={`${event.name}: ${event.subtitle}`}
                  period={event.readableEventPeriod}
                  location={event.location} />);
              })
            }
          </EventsBoardEdge>
        );
      }
    }
  }
}

export default EventsBoard;
