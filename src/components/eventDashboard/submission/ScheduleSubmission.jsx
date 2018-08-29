import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ScheduleSubmission extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialDate: moment(),
      finalDate: moment(),
      selectedSessions: [],
      location: "",
      selectedSubmissions: [],
    };

    this.changeInitialDate = this.changeInitialDate.bind(this);
    this.changeFinalDate = this.changeFinalDate.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeSubmissionList = this.changeSubmissionList.bind(this);
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
        </div>
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
          <div className="col-md-12">
            <a onClick={() => this.props.createSession(this.props.entity, this.state.initialDate, this.state.finalDate)} className="form-control btn btn-success">Adicionar bloco de apresentações</a>
          </div>
        </div><br/>
        <h5><strong>Blocos de apresentações</strong></h5>
        { this.props.sessions &&
          this.props.sessions.map((session) => {
            const initialDate = new Date(session.initialDate);
            const finalDate = new Date(session.finalDate);

            return(
              <div key={session._id} className="card">
                <div className="card-body">
                  <div className="card-title">{`${initialDate.getDate()}/${initialDate.getMonth()+1}/${initialDate.getFullYear()} a partir de ${initialDate.getHours()}:${initialDate.getMinutes()} até ${finalDate.getHours()}:${finalDate.getMinutes()}`}</div>
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
            const initialDate = new Date(session.initialDate);
            const finalDate = new Date(session.finalDate);
            return (
              <div key={session._id} style={{display: 'inline-block', margin: '5px'}}>
                <input onChange={(e) => { this.changeSelection(e, session._id) }} type="checkbox" key={session._id} />{`${initialDate.getDate()}/${initialDate.getMonth()+1}/${initialDate.getFullYear()} a partir de ${initialDate.getHours()}:${initialDate.getMinutes()} até ${finalDate.getHours()}:${finalDate.getMinutes()}`}
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
