import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import UserPicker from '../../userPicker/userPicker';

class EnrollButton extends Component {
  render() {
    return (
      <span><a className={"btn btn-" + this.props.style}
        onClick={this.props.onClick}
        target="blank_">
        {this.props.text}
      </a>{' '}</span>
    )
  }
}

class EditActivity extends Component {
  constructor(props) {
    super(props);

    let ofProposersUsers = null;
    if (this.props.objectToEdit.data.ofProposersUsers.length > 0) {
      ofProposersUsers = this.props.objectToEdit.data.ofProposersUsers;
    }

    this.state = {
      title: "",
      shift: 0,
      syllabus: "",
      vacancies: 0,
      ofProposersUsers: ofProposersUsers,
    }

    this.changeTitle = this.changeTitle.bind(this);
    this.changeShift = this.changeShift.bind(this);
    this.changeSyllabus = this.changeSyllabus.bind(this);
    this.changeVacancies = this.changeVacancies.bind(this);
    this.changeOfProposersUsers = this.changeOfProposersUsers.bind(this);
  }

  componentDidMount() {
    if (this.props.objectToEdit.length !== 0) {
      this.setState({
        title: this.props.objectToEdit.data.title,
        syllabus: this.props.objectToEdit.data.syllabus,
        shift: parseInt(this.props.objectToEdit.data.shift),
        vacancies: parseInt(this.props.objectToEdit.data.vacancies),
        ofProposersUsers: this.props.objectToEdit.data.ofProposersUsers,
        _id: this.props.objectToEdit._id,
      })
    }
  }

  changeTitle(e) {
    const target = e.nativeEvent.target;
    this.setState({
      title: target.value,
    });
  }

  changeShift(e) {
    const target = e.nativeEvent.target;
    this.setState({
      shift: parseInt(target.value),
    });
  }

  changeSyllabus(e) {
    const target = e.nativeEvent.target;
    this.setState({
      syllabus: target.value,
    });
  }

  changeVacancies(e) {
    const target = e.nativeEvent.target;
    this.setState({
      vacancies: parseInt(target.value),
    });
  }

  changeOfProposersUsers(users_) {
    this.setState({
      ofProposersUsers: users_,
    });
  }

  render() {
    return (
      <div>
        <h5><strong>Edição de proposta {this.props.entity.name}</strong></h5>
        <div className="form-group">
          <label htmlFor="form-title">Título da proposta</label>
          <input value={this.state.title} id="form-title" className="form-control" onChange={this.changeTitle} />
        </div>
        <div className="form-group">
          <label htmlFor="form-shift">Turno de preferência</label>
          <select value={this.state.shift} id="form-shift" className="form-control" onChange={this.changeShift}>
            <option value={0}>Manhã</option>
            <option value={1}>Tarde</option>
            <option value={2}>Noite</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="form-syllabus">
            {this.props.entity.slug == 'roundtable' ?
              'Proposta' :
              'Ementa'
            }
          </label>
          <textarea value={this.state.syllabus} onChange={this.changeSyllabus} className="form-control" id="form-syllabus"></textarea>
        </div>
        {this.props.entity.slug != 'roundtable' &&
          <div className="form-group">
            <label htmlFor="form-vacancies">Vagas ofertadas</label>
            <input value={this.state.vacancies} type="number" className="form-control" onChange={this.changeVacancies} />
          </div>}
        <br />
        <strong>Seleção de{' '}
          {this.props.entity.slug == 'roundtable' ?
            'coordenadores' :
            'expositores'
          }
          <UserPicker
            eventId={this.props.eventId}
            maxAuthors={this.props.entity.data.maxProposersUsers}
            initialUserEmail={this.props.userEmail}
            onChange={this.changeOfProposersUsers}
            users={this.state.ofProposersUsers}
          />
        </strong>
        <div className="form-group">
          <button style={{ width: '100%' }} className="btn btn-warning" onClick={() => this.props.setObjectToEdit([])}>Voltar</button>
        </div>
        <div className="form-group">
          <button style={{ width: '100%' }} className="btn btn-success" onClick={() => this.props.editObject(this.props.entity.slug, this.state)}>Salvar alterações</button>
        </div>
      </div>
    );
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

  emitCertificate(objectId, type) {
    this.props.emitCertificate(this.props.entity, objectId, type);
  }

  render() {
    return (
      <div id="printable">
        <h5>Lista de Presença{' '}
          {this.props.listOfPresence &&
            `(${this.props.listOfPresence.data.ofEnrollments.length})`
          }
        </h5>
        <table className='table d-print-none'>
          <thead>
            <tr>
              <th className="d-print-none">Marcar falta</th>
              <th className="d-print-none">Status certificado</th>
              <th>Nome/Email</th>
              <th>Assinatura</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listOfPresence &&
              this.props.listOfPresence.data.ofEnrollments.sort((a, b) => (a.user.name > b.user.name) ? 1 : ((b.user.name > a.user.name) ? -1 : 0)).map(user => {
                return (
                  <tr key={user._id}>
                    {user.present === false ? <td className="d-print-none"><span><a className="btn btn-danger"
                      onClick={() => this.setPresence(this.props.entity, { presence: true, enrollmentId: user._id, objId: this.props.listOfPresence._id })}>Marcar falta</a>{' '}</span></td> :
                      <td className="d-print-none"><span><a className="btn btn-success"
                        onClick={() => this.setPresence(this.props.entity, { presence: false, enrollmentId: user._id, objId: this.props.listOfPresence._id })}>Reverter falta</a>{' '}</span></td>
                    }
                    {user.present === true && !user.cert ? <td>Não compareceu</td> :
                      user.present === false && !user.cert ? <td>Certificado faltando</td> :
                        <td>Certificado emitido</td>
                    }
                    <td>{user.user.name}({user.user.email})</td>
                    <td></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {this.props.listOfPresence.data.status === 'consolidated' &&
          <span><a style={{ width: '100%' }} className="btn btn-warning d-print-none" onClick={() => { this.emitCertificate(this.props.listOfPresence._id, 'enrollment'); }}>
            Emitir certificados
                        </a>{' '}</span>
        }
        <br />
        <span><a style={{ width: '100%' }} className="btn btn-primary d-print-none" onClick={() => this.setListToPrint([])}>
          Voltar
                        </a>{' '}</span>
        <br />
        <br />
        <ListOfUsers listOfEnrollments={this.props.listOfEnrollments} listOfPresence={this.props.listOfPresence}
          enroll={this.props.enroll} exit={this.props.exit} entity={this.props.entity} />

        {/*  table to print */}
        <table className='table d-print-block table-print only-print-style' id="printable" >
          <thead>
            <tr>
              <th className="left-th">Nome</th>
              <th className="right-th">Assinatura</th>
            </tr>
          </thead>
          <tbody>

            {this.props.listOfPresence &&
              this.props.listOfPresence.data.ofEnrollments.map((user, index) => {
                return (
                  <tr key={user._id} >
                    <td>{user.user.name}</td>
                    <td>{''}</td>
                  </tr>
                );


              })
            }
          </tbody>
        </table>
      </div>
    )


    //end of temprary talbe
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
    return (
      <div className="d-print-none">
        <br />
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
            {this.state.searchTerm.length > 2 &&
              this.state.currentlyDisplayed.map(person => {
                return (
                  <tr key={person._id}>
                    <td>{person.name}</td>
                    {
                      !this.props.listOfPresence.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(person._id) &&
                      <td><EnrollButton onClick={() => this.enroll({
                        activityId: this.props.listOfPresence._id,
                        userId: person._id
                      })}
                        style={'success'} text={'Inscrever'} /></td>
                    }
                    {
                      this.props.listOfPresence.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(person._id) &&
                      <td><EnrollButton onClick={() => this.exit({
                        activityId: this.props.listOfPresence._id,
                        userId: person._id
                      })}
                        style={'warning'} text={'Desmarcar'} /></td>
                    }
                  </tr>)
              })
            }
            {this.state.searchTerm.length <= 2 &&
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
    return (
      <div>
        <h5><strong>Todas propostas realizadas{' '}
          {this.props.allObjects &&
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
              this.props.allObjects.filter(obj => !obj.data.deleted).sort((a, b) => (a.data.title > b.data.title) ? 1 : ((b.data.title > a.data.title) ? -1 : 0)).map((object) => {
                const certEmitted = object.data.ofEnrollments.reduce((prev, curr) => {
                  return (prev || curr.cert);
                }, false);
                return (
                  <tr key={object._id}>
                    <td>
                      <strong>{object.data.title}</strong>{' '}
                      {
                        object.data.status === 'consolidated' ?
                          <span className="badge badge-success">Consolidado</span> :
                        object.data.status === 'waiting' ?
                          <span className="badge badge-info">Aguardando consolidação</span> :
                          <span className="badge badge-info">Aguardando consentimento do coordenador</span>
                      }
                      <br />
                      <strong>Turno de preferência</strong>:{' '}
                      {object.data.shift === 0 ? 'Manhã' :
                        object.data.shift === 1 ? 'Tarde' :
                          object.data.shift === 2 ? 'Noite' : 'Indefinido'
                      }
                      <br />
                      <strong>Vagas</strong>: {object.data.status === 'consolidated' ? object.data.consolidation.vacancies : object.data.vacancies}
                      <strong>Localização</strong>: {object.data.status === 'consolidated' ? object.data.consolidation.location : 'Não definido ainda'}
                      <p className="activity-syllabus" style={{ textAlign: 'justify' }}>
                        <strong>Ementa</strong>: {object.data.syllabus}</p>
                      {object.data.ofFields &&
                        object.data.ofFields.map((field) => {
                          return (
                            <p key={field._id} className={field.request.name} style={{ textAlign: 'justify' }}>
                              <strong>{field.request.readableName}</strong>: {field.value}
                            </p>
                          );
                        })
                      }
                      {object.data.ofFiles &&
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
                      <span><a className="btn btn-primary" onClick={() => this.props.setObjectToEdit(object)} target="blank_">
                        Editar
                        </a>{' '}</span>
                      <span><a className="btn btn-danger" onClick={() => this.props.deleteObject(this.props.entity, object._id)} target="blank_">
                        Deletar 
                        </a>{' '}</span>
                      {object.data.status === 'consolidated' && !certEmitted &&
                        <a className='btn btn-primary' onClick={() => { this.emitCertificate(object._id, 'enrollment'); }}>Emitir certificados</a>
                      }
                      {object.data.status === 'consolidated' && certEmitted &&
                        <span className="badge badge-success">Certificados emitidos</span>
                      }
                    </td>
                    <td>
                      {
                        object.data.ofProposersUsers.map((author) => {
                          return (<span key={author._id}>{`${author.name} (${author.email})`}<br /></span>)
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
    if (this.props.listOfPresence.length === 0 && this.props.objectToEdit.length === 0) {
      return (<SeeAllObjectsPane entity={this.props.entity}
        loadAllObjects={this.props.loadAllObjects}
        setListToPrint={this.props.setListToPrint}
        emitCertificate={this.props.emitCertificate}
        setObjectToEdit={this.props.setObjectToEdit}
        deleteObject={this.props.deleteObject}
        allObjects={this.props.allObjects} />)
    } else if (this.props.listOfPresence.length !== 0 && this.props.objectToEdit.length === 0) {
      return (
        <div>
          <ListOfPresencePane loadAllObjects={this.props.loadAllObjects}
            entity={this.props.entity}
            setListToPrint={this.props.setListToPrint}
            setPresence={this.props.setPresence}
            allObjects={this.props.allObjects}
            listOfPresence={this.props.listOfPresence}
            listOfEnrollments={this.props.listOfEnrollments}
            emitCertificate={this.props.emitCertificate}
            enroll={this.props.enroll}
            exit={this.props.exit}
          />
        </div>
      )
    } else {
      return (<EditActivity entity={this.props.activities.entity}
        objectToEdit={this.props.objectToEdit}
        setObjectToEdit={this.props.setObjectToEdit}
        editObject={this.props.editObject}
        eventId={this.props.eventId} />)
    }
  }

}

export default SeeAllObjects;
