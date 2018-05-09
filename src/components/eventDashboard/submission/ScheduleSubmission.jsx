import React, { Component } from 'react';

class ScheduleSubmission extends Component {

  constructor(props) {
    super(props);

    const initialDate = new Date((new Date().getFullYear()), 0, (new Date().getDate()));

    this.state = {
      date: initialDate,
      shift: 0,
      hour: "",
      selectedSessions: "",
      location: "",
      selectedSubmissions: [],
    };

    this.changeDay = this.changeDay.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeShift = this.changeShift.bind(this);
    this.changeHour = this.changeHour.bind(this);
    this.createSession = this.createSession.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeSubmissionList = this.changeSubmissionList.bind(this);
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

  changeHour(e) {
    const target = e.nativeEvent.target;
    this.setState({
      hour: target.value,
    })
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

  checkSubmissionList(id) {
    if(this.state.selectedSubmissions.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  changeSubmissionList(id) {
    if(!this.checkSubmissionList(id)) {
      this.setState((prevState, props) => {
        const selectedsSubmissions = [ ...prevState.selectedSubmissions, id ];
        return { selectedSubmissions: selectedsSubmissions };
      });
    } else {
      this.setState((prevState, props) => {
        const selectedsSubmissions = prevState.selectedSubmissions.filter(s => s !== id);
        return { selectedSubmissions: selectedsSubmissions };
      });
    }
  }

  changeLocation(e) {
    const target = e.nativeEvent.target;
    this.setState({
      location: target.value,
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

  createSession() {
    this.props.createSession(this.props.entity, this.state.date, this.state.shift, this.state.hour);
  }

  scheduleSubmissions(entity) {
    this.props.scheduleSubmissions(entity, this.state.selectedSubmissions, this.state.selectedSessions, this.state.location);
    this.setState({
      selectedSubmissions : [],
    })
  }

  render() {
    return(
      <div>
        <h5><strong>Criar bloco de apresentações</strong></h5>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="form-day">Dia</label>
            <input type="number" id="form-day" className="form-control" min="1" max="31" value={this.state.date.getDate()} onChange={this.changeDay}/>
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlFor="form-year">Ano</label>
            <input value={this.state.date.getFullYear()} type="number" id="form-year" className="form-control" onChange={this.changeYear} />
          </div>
          <div className="col-md-6">
            <label htmlFor="form-hour">Hora</label>
            <input value={this.state.hour} id="form-hour" className="form-control" onChange={this.changeHour} />
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
            <a onClick={this.createSession} className="form-control btn btn-success">Adicionar bloco de apresentações</a>
          </div>
        </div><br/>
        <h5><strong>Blocos de apresentações</strong></h5>
        { this.props.sessions &&
          this.props.sessions.map((session) => {
            const date = new Date(session.date);
            const shift = session.shift == 0 ? "Manhã" :
                          session.shift == 1 ? "Tarde" :
                          "Noite";
            const hour = session.hour;

            return(
              <div key={session._id} className="card">
                <div className="card-body">
                  <div className="card-title">{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${shift} - ${hour}`}</div>
                  <table className="table">
                    <tbody>
                    { this.props.allObjects &&
                      this.props.allObjects.filter((object) => {
                        if (object.data.consolidation !== undefined && object.data.consolidation !== null) {
                          return object.data.consolidation.sessions.reduce((previous, currentSess) => {
                            return previous || currentSess == session._id;
                          }, false);
                        } else {
                          return false;
                        }
                      }).map((submission) => {
                        return (
                          <tr key={submission._id}>
                            <td>
                              <strong>{submission.data.title}</strong> (Local: {submission.data.consolidation.location}) <a style={{float:'right'}} onClick={() => {this.props.cancelSubmissionPresentation(this.props.entity, submission._id)}}>Cancelar apresentação</a><br/>
                              Grupo Temático: {submission.data.thematicGroup.data.name}
                              <hr/>
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
        <br/><h5>Selecione o horário em que as apresentações serão feitas</h5>
        { this.props.sessions &&
          this.props.sessions.map((session) => {
            const date = new Date(session.date);
            const shift = session.shift == 0 ? "Manhã" :
                          session.shift == 1 ? "Tarde" :
                          "Noite";
            return (
              <div key={session._id} style={{display: 'inline-block', margin: '5px'}}>
                <input onChange={(e) => { this.changeSelection(e, session._id) }} type="checkbox" key={session._id} />{`  ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${shift}`}
              </div>
            );
          })
        }
        <br /><br /><div className="col-md-8" style={{ margin: '-15px' }}>
            <label htmlFor="form-location">Localização das apresentações</label>
            <input value={this.state.location} id="form-location" className="form-control" onChange={this.changeLocation} />
        </div>
        <br/><h5><strong>Submissões não consolidadas</strong></h5>
        <table className="table">
          <thead>
            <tr>
              <th>Submissões</th>
            </tr>
          </thead>
          <tbody>
            { this.props.allObjects &&
              this.props.allObjects.filter((object) => (object.data.consolidation === undefined || object.data.consolidation === null) && object.data.state === 'approved' ).map(object => {
                return (
                    <tr key={object._id}>
                      <td>
                        <strong>{object.data.title}</strong>{' '}
                      </td>
                      <td>
                        { !this.checkSubmissionList(object._id) &&
                        <a onClick={() => { this.changeSubmissionList(object._id)} } style={{float: 'right'}} className="btn btn-success">Marcar submissão</a>
                        }
                        { this.checkSubmissionList(object._id) &&
                        <a onClick={() => { this.changeSubmissionList(object._id)} } style={{float: 'right'}} className="btn btn-danger">Desmarcar submissão</a>
                        }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <br/><a onClick={() => this.scheduleSubmissions(this.props.entity)} style={{float: 'right', width: '100%'}} className="btn btn-light">Agendar submissões selecionadas</a>
        </div>
      );
    }
  }

  export default ScheduleSubmission;
