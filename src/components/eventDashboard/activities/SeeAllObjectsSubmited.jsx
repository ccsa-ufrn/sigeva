import React, { Component } from 'react';

class ListOfPresencePane extends Component {
  constructor(props) {
    super(props);

    this.setListToPrint = this.setListToPrint.bind(this);
  }
  
  componentDidMount() {
    this.props.loadAllObjectsSubmited(this.props.entity, this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.setListToPrint([]);
      this.props.loadAllObjectsSubmited(this.props.entity, this.props.userId);
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
            </tr>
          </thead>
          <tbody>
          { this.props.listOfPresence &&
            this.props.listOfPresence.data.ofEnrollments.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.user.name}</td>
                  <td>{user.user.email}</td>
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
      </div>
    )
  }

}

class SeeAllObjectsSubmitedPane extends Component {
  constructor(props) {
    super(props);
    this.setListToPrint = this.setListToPrint.bind(this);
  }

  componentDidMount() {
    this.props.loadAllObjectsSubmited(this.props.entity, this.props.userId);
    this.props.setListToPrint([]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.loadAllObjectsSubmited(this.props.entity, this.props.userId);
      this.props.setListToPrint([]);
    }
  }

  setListToPrint(ofEnrollments) {
    this.props.setListToPrint(ofEnrollments);
  }

  render() {
    return(
      <div>
        <h5><strong>Todas propostas submetidas{' '}
          { this.props.allObjectsSubmited &&
            `(${this.props.allObjectsSubmited.length})`
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
              this.props.allObjectsSubmited &&
              this.props.allObjectsSubmited.map((object) => {
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
                      <strong>Vagas</strong>: { object.data.ofEnrollments.length } de { object.data.status === 'consolidated' ? object.data.consolidation.vacancies : object.data.vacancies } {' '}
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

class SeeAllObjectsSubmited extends Component {
  render() {
    if(this.props.listOfPresence.length === 0) {
      return (<SeeAllObjectsSubmitedPane entity={this.props.entity}
                                loadAllObjectsSubmited={this.props.loadAllObjectsSubmited}
                                userId={this.props.userSession.logged_user.id}
                                setListToPrint={this.props.setListToPrint}
                                allObjectsSubmited={this.props.allObjectsSubmited} />)
                                
    } else {
      return (
          <ListOfPresencePane loadAllObjectsSubmited={this.props.loadAllObjectsSubmited}
                                    entity={this.props.entity}
                                    setListToPrint={this.props.setListToPrint}
                                    listOfPresence={this.props.listOfPresence} 
                                    userId={this.props.userSession.logged_user.id}
                                    allObjectsSubmited={this.props.allObjectsSubmited}
          />
      )
    }
  }

} 

export default SeeAllObjectsSubmited;
