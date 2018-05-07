import React, { Component } from 'react';

class SeeObjects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserObjects(this.props.entity);
  }

  render() {
    return(

      <div>
        <h5><strong>Ver submissões realizadas</strong></h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Participantes</th>
              <th>Arquivos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            { this.props.submission.userObjects &&
              this.props.submission.userObjects.map((object) => {
                return (
                  <tr key={object._id}>
                    <td>{object.data.title} - 
                    <a data-toggle="collapse" href={`#clps-${object.data._id}`} aria-expanded="false" role="button" aria-controls={`#clps-${object.data._id}`}>  Expandir</a>
                      <div className="collapse" id={`clps-${object.data._id}`}>
                        <span>Datas da apresentação:{' '}
                        { object.data.consolidation &&
                          object.data.consolidation.sessions.map((session) => {
                            const date = new Date(session.date)
                            return (
                              date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()  + '  \n'
                            )
                          })
                        }
                        { !object.data.consolidation &&
                            <span>Sem datas de agendamento</span>
                        }
                        <br/></span>
                        { object.data.consolidation &&
                          <span>Localização da apresentação - {object.data.consolidation.location}</span>
                        }
                        { !object.data.consolidation &&
                          <span>Localização da apresentação - Localização ainda não definida</span>
                        }
                      </div>
                    </td>
                    <td>{object.data.authors.map((author)=> `${author.name} - `)}</td>
                    <td>{object.data.files &&
                      object.data.files.map((file) => {
                        return (<span key={file._id}><a href={`/file/download/${file._id}`} target='_blank'>{file.fileRequirement.name}</a><br/></span>)
                      })
                    }</td>
                    <td>
                    { object.data.state == 'waiting_evaluation' ?
                      'Aguardando avaliação' :
                      object.data.state == 'approved' ?
                      'Aprovado' :
                      'Rejeitado'
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

export default SeeObjects;
