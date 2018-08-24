import React, { Component } from 'react';

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
    this.props.consolidateActivity(this.props.object.entity, this.props.object._id, this.state.selectedSessions, this.state.location, this.state.vacancies);
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
                const date = new Date(session.date);
                const shift = session.shift == 0 ? "Manhã" :
                              session.shift == 1 ? "Tarde" :
                              "Noite";
                return (
                  <div key={session._id}>
                    <input onChange={(e) => { this.changeSelection(e, session._id); }} type="checkbox" key={session._id} /> {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${shift}`}
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

    const initialDate = new Date((new Date().getFullYear()), 0, (new Date().getDate()));

    this.state = {
      date: initialDate,
      shift: 0,
    };

    this.changeDay = this.changeDay.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeShift = this.changeShift.bind(this);
    this.createSession = this.createSession.bind(this);
  }

  changeDay(e) {
    const target = e.nativeEvent.target;
    const newDate = new Date(this.state.date.getFullYear(),
                             this.state.date.getMonth(),
                             target.value);
    this.setState({
      date: newDate,
    });
  }

  changeMonth(e) {
    const target = e.nativeEvent.target;
    const newDate = new Date(this.state.date.getFullYear(),
                             target.value - 1,
                             this.state.date.getDate());
    this.setState({
      date: newDate,
    });
  }

  changeYear(e) {
    const target = e.nativeEvent.target;
    const newDate = new Date(target.value,
                             this.state.date.getMonth(),
                             this.state.date.getDate());
    this.setState({
      date: newDate,
    });
  }

  changeShift(e) {
    const target = e.nativeEvent.target;
    this.setState({
      shift: parseInt(target.value),
    })
  }

  createSession() {
    this.props.createSession(this.props.entity, this.state.date, this.state.shift);
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
          <div className="col-md-4">
            <label htmlFor="form-day">Dia</label>
            <input type="number" id="form-day" className="form-control" min="1" max="31" value={this.state.date.getDate()} onChange={this.changeDay}/>
          </div>
          <div className="col-md-4">
            <label htmlFor="form-month">Mês</label>
            <select id="form-month" className="form-control" onChange={this.changeMonth}>
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="form-year">Ano</label>
            <input value={this.state.date.getFullYear()} type="number" id="form-year" className="form-control" onChange={this.changeYear} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="form-shift">Turno</label>
            <select id="form-shift" className="form-control" onChange={this.changeShift}>
              <option value={0}>Manhã</option>
              <option value={1}>Tarde</option>
              <option value={2}>Noite</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <a onClick={this.createSession} className="form-control btn btn-success">Adicionar bloco de atividades</a>
          </div>
        </div><br/>
        <h5><strong>Blocos de atividades</strong></h5>
        { this.props.sessions &&
          this.props.sessions.map((session) => {
            const date = new Date(session.date);
            const shift = session.shift == 0 ? "Manhã" :
                          session.shift == 1 ? "Tarde" :
                          "Noite";

            return(
              <div key={session._id} className="card">
                <div className="card-body">
                  <div className="card-title">{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${shift}`}</div>
                  <table>
                    <tbody>
                    { this.props.allObjects &&
                      this.props.allObjects.filter( obj=>obj.data.status !== "waiting" ).filter((object) => {
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
        <br/><h5><strong>Atividades não consolidadas</strong></h5>
        <table className="table">
          <thead>
            <tr>
              <th>Atividade</th>
            </tr>
          </thead>
          <tbody>
            { this.props.allObjects &&
              this.props.allObjects.filter(s => s.data.status == "waiting").map((object) => {
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
