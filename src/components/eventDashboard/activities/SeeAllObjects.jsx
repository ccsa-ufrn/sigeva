import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

class ListOfPresencePane extends Component {
  constructor(props) {
    super(props);

    this.setListToPrint = this.setListToPrint.bind(this);
  }
  
  componentDidMount() {
    this.props.loadAllObjects(this.props.entity);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.setListToPrint([]);
    if (prevProps.entity !== this.props.entity) {
      this.props.loadAllObjects(this.props.entity);
    }
  }

  setListToPrint(ofEnrollments) {
    this.props.setListToPrint(ofEnrollments);
  }

  render() {
    return(
      <div>
      <h5>Lista de Presença</h5>
      <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Assinatura</th>
            </tr>
          </thead>
          <tbody>
          { this.props.listOfPresence &&
            this.props.listOfPresence.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.user.name}</td>
                  <td>{user.user.email}</td>
                  <td></td>
                </tr>
              );
            })
          }
          </tbody>
      </table>
      <br/>
      <span><a className="btn btn-primary" onClick={() => this.setListToPrint([])}>
                        'Voltar  '   
                        </a>{' '}</span>
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
                      <span key={object._id}><a className="btn btn-primary" onClick={() => this.setListToPrint(object.data.ofEnrollments)}>
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
      return (<SeeAllObjectsPane loadAllObjects={this.props.loadAllObjects}
                                setListToPrint={this.props.setListToPrint}
                                allObjects={this.props.allObjects} />)
    } else {
      return (
        <div>
          <ListOfPresencePane loadAllObjects={this.props.loadAllObjects}
                                    setListToPrint={this.props.setListToPrint}
                                    allObjects={this.props.allObjects}
                                    listOfPresence={this.props.listOfPresence} 
                                    ref={el => (this.componentRef = el)}
          />
          <ReactToPrint
            trigger={() => <span><a className="btn btn-primary">Imprimir </a>{' '}</span>}
            content={() => this.componentRef}
          />
        </div>
      )
    }
  }

} 

export default SeeAllObjects;
