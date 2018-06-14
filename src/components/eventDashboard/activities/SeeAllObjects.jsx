import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

class EnrollButton extends Component {
  render() {
    return(
    <span><a className={"btn btn-" + this.props.style}
        onClick={this.props.onClick}
        target="blank_">
        {this.props.text}
    </a>{' '}</span>
    )
  }
}

class ListOfPresencePane extends Component {
  constructor(props) {
    super(props);

    this.setListToPrint = this.setListToPrint.bind(this);
    this.setPresence = this.setPresence.bind(this);
  }

  componentDidMount() {
    this.props.loadAllObjects(this.props.entity);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.setListToPrint([]);
      this.props.loadAllObjects(this.props.entity);
    }
  }

  setListToPrint(ofEnrollments) {
    this.props.setListToPrint(ofEnrollments);
  }

  setPresence(entitySlug, presence) {
    this.props.setPresence(entitySlug, presence);
  }

  render() {
    return(
      <div id="printable">
      <h5>Lista de Presença{' '}
        { this.props.listOfPresence &&
          `(${this.props.listOfPresence.data.ofEnrollments.length})`
        }
      </h5>
      <table className='table'>
          <thead>
            <tr>
              <th className="d-print-none">Marcar falta</th>
              <th>Nome/Email</th>
              <th>Assinatura</th>
            </tr>
          </thead>
          <tbody>
          { this.props.listOfPresence &&
            this.props.listOfPresence.data.ofEnrollments.map(user => {
              return (
                <tr key={user._id}>
                  { user.present === false ? <td className="d-print-none"><span><a className="btn btn-danger"
                    onClick={() => this.setPresence(this.props.entity, {presence: true, enrollmentId: user._id, objId: this.props.listOfPresence._id})}>Marcar falta</a>{' '}</span></td> :
                    <td className="d-print-none"><span><a className="btn btn-success"
                    onClick={() => this.setPresence(this.props.entity, {presence: false, enrollmentId: user._id, objId: this.props.listOfPresence._id})}>Reverter falta</a>{' '}</span></td>
                  }
                  <td>{user.user.name}({user.user.email})</td>
                  <td></td>
                </tr>
              );
            })
          }
          </tbody>
      </table>
      <br/>
      <span><a style={{width: '100%'}} className="btn btn-primary d-print-none" onClick={() => this.setListToPrint([])}>
                        Voltar
                        </a>{' '}</span>
      <br/>
      <br/>
      <ListOfUsers listOfEnrollments={this.props.listOfEnrollments} listOfPresence={this.props.listOfPresence}
                   enroll={this.props.enroll} exit={this.props.exit} entity={this.props.entity} />
      </div>
    )
  }

}

class ListOfUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      currentlyDisplayed: [],
    }
    this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
    this.enroll = this.enroll.bind(this);
    this.exit = this.exit.bind(this);

  }

  onSearchBoxChange(event) {
    const newlyDisplayed = this.props.listOfEnrollments.filter(enrollment => enrollment.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  }

  enroll(enrollObject) {
    this.props.enroll(this.props.entity, enrollObject);
  }

  exit(enrollObject) {
    this.props.exit(this.props.entity, enrollObject);
  }

  render() {
    return(
      <div className="d-print-none">
        <br/>
        <h5>Adicionar participantes</h5>
          Nome da pessoa: <input type="text" className="form-control" onChange={this.onSearchBoxChange} />
        <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Presença</th>
            </tr>
          </thead>
          <tbody>
            { this.state.searchTerm.length > 2 &&
              this.state.currentlyDisplayed.map(person => {
              return (
                <tr key={person._id}>
                <td>{person.name}</td>
                {
                  !this.props.listOfPresence.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(person._id) &&
                  <td><EnrollButton onClick={() => this.enroll({ activityId: this.props.listOfPresence._id,
                    userId: person._id})}
                    style={'success'} text={'Inscrever'} /></td>
                }
                {
                  this.props.listOfPresence.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(person._id) &&
                  <td><EnrollButton onClick={() => this.exit({ activityId: this.props.listOfPresence._id,
                    userId: person._id})}
                    style={'warning'} text={'Desmarcar'} /></td>
                }
                </tr>)
              })
            }
            { this.state.searchTerm.length <= 2 &&
              <tr>
                <td></td>
                <td></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

class SeeAllObjectsPane extends Component {
  constructor(props) {
    super(props);

    this.setListToPrint = this.setListToPrint.bind(this);
    this.emitCertificate = this.emitCertificate.bind(this);
  }

  componentDidMount() {
    this.props.loadAllObjects(this.props.entity);
    this.props.setListToPrint([]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.loadAllObjects(this.props.entity);
      this.props.setListToPrint([]);
    }
  }

  setListToPrint(ofEnrollments) {
    this.props.setListToPrint(ofEnrollments);
  }

  emitCertificate(objectId, type) {
    this.props.emitCertificate(this.props.entity, objectId, type);
  }

  render() {
    return(
      <div>
        <h5><strong>Todas propostas realizadas{' '}
          { this.props.allObjects &&
            `(${this.props.allObjects.length})`
          }
        </strong></h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Propositores</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.allObjects &&
              this.props.allObjects.map((object) => {
                const certEmitted = object.data.ofEnrollments.reduce((prev, curr) => {
                  return (prev || curr.cert );
                }, false);
                return (
                  <tr key={object._id}>
                    <td>
                      <strong>{object.data.title}</strong>{' '}
                      { object.data.status === 'consolidated' ?
                        <span className="badge badge-success">Consolidado</span>
                      : <span className="badge badge-info">Aguardando consolidação</span>}
                      <br/>
                      <strong>Turno de preferência</strong>:{' '}
                      { object.data.shift === 0 ? 'Manhã' :
                        object.data.shift === 1 ? 'Tarde' :
                        object.data.shift === 2 ? 'Noite' : 'Indefinido'
                      }
                      <br/>
                      <strong>Vagas</strong>: { object.data.status === 'consolidated' ? object.data.consolidation.vacancies : object.data.vacancies }
                      <strong>Localização</strong>: { object.data.status === 'consolidated' ? object.data.consolidation.location : 'Não definido ainda'}
                      <p style={{textAlign: 'justify'}}>
                      <strong>Ementa</strong>: { object.data.syllabus }</p>
                      { object.data.ofFields &&
                        object.data.ofFields.map((field) => {
                          return (
                            <p key={field._id} style={{textAlign: 'justify'}}>
                              <strong>{field.request.readableName}</strong>: {field.value}
                            </p>
                          );
                        })
                      }
                      { object.data.ofFiles &&
                        object.data.ofFiles.map((file) => {
                          return (
                            <span key={file._id}><a className="btn btn-primary" href={`/file/download/${file._id}`} target="blank_">
                              {file.fileRequirement.name}
                            </a>{' '}</span>
                          );
                        })
                      }
                      <span key={object._id}><a className="btn btn-primary" onClick={() => this.setListToPrint(object)} target="blank_">
                        Mostrar lista de presença
                        </a>{' '}</span>
                      { object.data.status === 'consolidated' && !certEmitted &&
                        <a className='btn btn-primary' onClick={() => {this.emitCertificate(object._id, 'enrollment');}}>Emitir certificados</a>
                      }
                      { object.data.status === 'consolidated' && certEmitted &&
                        <span className="badge badge-success">Certificados emitidos</span>
                      }
                    </td>
                    <td>
                      {
                        object.data.ofProposersUsers.map((author) => {
                          return (<span key={author._id}>{`${author.name} (${author.email})`}<br/></span>)
                        })
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class SeeAllObjects extends Component {

  componentDidMount() {
    this.props.loadEnrollments();
  }

  render() {
    if(this.props.listOfPresence.length === 0) {
      return (<SeeAllObjectsPane entity={this.props.entity}
                                loadAllObjects={this.props.loadAllObjects}
                                setListToPrint={this.props.setListToPrint}
                                emitCertificate={this.props.emitCertificate}
                                allObjects={this.props.allObjects} />)
    } else {
      return (
        <div>
          <ListOfPresencePane loadAllObjects={this.props.loadAllObjects}
                                    entity={this.props.entity}
                                    setListToPrint={this.props.setListToPrint}
                                    setPresence={this.props.setPresence}
                                    allObjects={this.props.allObjects}
                                    listOfPresence={this.props.listOfPresence}
                                    listOfEnrollments={this.props.listOfEnrollments}
                                    enroll={this.props.enroll}
                                    exit={this.props.exit}
          />
        </div>
      )
    }
  }

}

export default SeeAllObjects;
