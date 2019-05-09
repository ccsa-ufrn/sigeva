import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ObjectConsolidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSessions: [],
      location: '',
      vacancies: props.object.data.vacancies,
    }

    this.changeSelection = this.changeSelection.bind(this);
    this.changeVacancies = this.changeVacancies.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.consolidateActivity = this.consolidateActivity.bind(this);
  }

  changeSelection(e, sessionId) {
    if(e.target.checked) {
      this.setState((prevState, props) => {
        const selecteds = [ ...prevState.selectedSessions, sessionId ];
        return { selectedSessions: selecteds };
      });
    } else {
      this.setState((prevState, props) => {
        const selecteds = prevState.selectedSessions.filter(s => s !== sessionId);
        return { selectedSessions: selecteds };
      });
    }
  }

  changeLocation(e) {
    const target = e.nativeEvent.target;
    this.setState({
      location: target.value,
    })
  }

  changeVacancies(e) {
    const target = e.nativeEvent.target;
    this.setState({
      vacancies: parseInt(target.value),
    });
  }

  consolidateActivity() {
    if(this.state.selectedSessions.length > 0) { 
      this.props.consolidateActivity(this.props.object.entity, this.props.object._id, this.state.selectedSessions, this.state.location, this.state.vacancies);
    }
  }

  render() {
    return(
      <tr>
        <td>
          <strong>{this.props.object.data.title}</strong>{' '}
          <a data-toggle="collapse" href={`#clps-${this.props.object.data._id}`} aria-expanded="false" role="button" aria-controls={`#clps-${this.props.object.data._id}`}>expandir</a>
          <div className="collapse" id={`clps-${this.props.object.data._id}`}>
            <div className="form-group">
            { this.props.sessions &&
              this.props.sessions.map((session) => {
              const initialDate = new Date(session.initialDate);
              const finalDate = new Date(session.finalDate);
                return (
                  <div key={session._id}>
                    <input onChange={(e) => { this.changeSelection(e, session._id); }} type="checkbox" key={session._id} /> {`${initialDate.getDate()}/${initialDate.getMonth()+1}/${initialDate.getFullYear()} a partir de ${initialDate.getHours()}:${initialDate.getMinutes()} até ${finalDate.getHours()}:${finalDate.getMinutes()}`}
                  </div>
                );
              })
              }
              Local da atividade: <input type="text" onChange={this.changeLocation} />{' '}
              Vagas ofertadas: <input type="number" defaultValue={this.props.object.data.vacancies} onChange={this.changeVacancies} />
              <a className="btn btn-success" onClick={this.consolidateActivity}>Consolidar atividade</a>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

class ConsolidateObject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialDate: moment(),
      finalDate: moment(),
    };

    this.changeInitialDate = this.changeInitialDate.bind(this);
    this.changeFinalDate = this.changeFinalDate.bind(this);
  }

  changeInitialDate(date) {
    this.setState({
      initialDate: date
    })
  }

  changeFinalDate(date) {
    this.setState({
      finalDate: date
    })
  }

  componentDidMount() {
    this.props.loadSessions(this.props.entity);
    this.props.loadAllObjects(this.props.entity);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entity !== this.props.entity) {
      this.props.loadSessions(nextProps.entity);
      this.props.loadAllObjects(nextProps.entity);
    }
  }

  render() {
    return(
      <div>
        <h5><strong>Criar bloco de atividades</strong></h5>
        <div className="form-group row">
          <div className="col-md-6">
            <br/>
            <label htmlFor="form-intialDate">Horário de começar</label>
            <DatePicker className="form-control" showTimeSelect timeFormat="HH:mm" timeIntervals={5} dateFormat="LLL" timeCaption="Hora" selected={this.state.initialDate} onChange={this.changeInitialDate} />
          </div>
          <div className="col-md-6">
            <br/>
            <label htmlFor="form-intialDate">Horário de terminar</label>
            <DatePicker className="form-control" showTimeSelect timeFormat="HH:mm" timeIntervals={5} dateFormat="LLL" timeCaption="Hora" selected={this.state.finalDate} onChange={this.changeFinalDate} />
          </div>
          <div className="col-md-12">
            <br/>
          </div>
            <a onClick={() => this.props.createSession(this.props.entity, this.state.initialDate, this.state.finalDate)} className="form-control btn btn-success">Adicionar bloco de atividades</a>
        </div><br/>
        <h5><strong>Blocos de atividades</strong></h5>
        { this.props.sessions &&
          this.props.sessions.map((session) => {
            const initialDate = new Date(session.initialDate);
            const finalDate = new Date(session.finalDate);

            return(
              <div key={session._id} className="card">
                <div className="card-body">
                  <div className="card-title">{`${initialDate.getDate()}/${initialDate.getMonth()+1}/${initialDate.getFullYear()} a partir de ${initialDate.getHours()}:${initialDate.getMinutes()} até ${finalDate.getHours()}:${finalDate.getMinutes()}`}</div>
                  <table>
                    <tbody>
                    { this.props.allObjects &&
                      this.props.allObjects.filter( obj=>obj.data.status === "consolidated" ).filter((object) => {
                        if (object.data.consolidation !== undefined) {
                          return object.data.consolidation.sessions.reduce((previous, currentSess) => {
                            return previous || currentSess._id == session._id;
                          }, false);
                        } else {
                          return false;
                        }
                      }).map((activity) => {
                        return (
                          <tr key={activity._id}>
                            <td>
                              <strong>{activity.data.title}</strong> <a onClick={() => {this.props.deconsolidateActivity(this.props.entity, activity._id)}}>Desconsolidar</a><br/>
                              {activity.data.consolidation.location} ({activity.data.consolidation.vacancies} vagas)
                            </td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        }
        <div className="card">
          <div className="card-body">
            <div className="card-title">Sem data</div>
            <table>
              <tbody>
              { this.props.allObjects &&
                this.props.allObjects.filter( obj=>obj.data.status === "consolidated" && obj.data.consolidation.sessions.length == 0).map((activity) => {
                  return (
                    <tr key={activity._id}>
                      <td>
                        <strong>{activity.data.title}</strong> <a onClick={() => {this.props.deconsolidateActivity(this.props.entity, activity._id)}}>Desconsolidar</a><br/>
                        {activity.data.consolidation.location} ({activity.data.consolidation.vacancies} vagas)
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
        <br/><h5><strong>Atividades não consolidadas</strong></h5>
        <table className="table">
          <thead>
            <tr>
              <th>Atividade</th>
            </tr>
          </thead>
          <tbody>
            { this.props.allObjects &&
              this.props.allObjects.filter(s => s.data.status == "waiting" && !s.data.deleted).map((object) => {
                return (
                  <ObjectConsolidation key={object._id} object={object} sessions={this.props.sessions} consolidateActivity={this.props.consolidateActivity} />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ConsolidateObject;
