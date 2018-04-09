import React, { Component } from 'react';

class SeeAllObjects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAllObjects(this.props.entity);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.loadAllObjects(this.props.entity);
    }
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
                      <strong>Vagas</strong>: { object.data.vacancies === 0 ? 'Sem limites': object.data.vacancies }
                      <br/>
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

export default SeeAllObjects;
