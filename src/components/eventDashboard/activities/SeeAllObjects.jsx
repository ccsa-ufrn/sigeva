import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

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
      <span><a className="btn btn-primary d-print-none" onClick={() => this.setListToPrint([])}>
                        Voltar   
                        </a>{' '}</span>
      <br/>
      </div>
    )
  }

}

class SeeAllObjectsPane extends Component {
  constructor(props) {
    super(props);

    this.setListToPrint = this.setListToPrint.bind(this);
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
                      <span key={object._id}><a className="btn btn-primary" onClick={() => this.setListToPrint(object)}>
                        Mostrar lista de presença
                        </a>{' '}</span>
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
  render() {
    if(this.props.listOfPresence.length === 0) {
      return (<SeeAllObjectsPane entity={this.props.entity}
                                loadAllObjects={this.props.loadAllObjects}
                                setListToPrint={this.props.setListToPrint}
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
          />
        </div>
      )
    }
  }

} 

export default SeeAllObjects;
