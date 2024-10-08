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
              this.props.submission.userObjects.filter(obj => obj.data.deleted != true).map((object) => {
                return (
                  <tr key={object._id}>
                    <td>{object.data.title} -
                    <a data-toggle="collapse" href={`#clps-${object.data._id}`} aria-expanded="false" role="button" aria-controls={`#clps-${object.data._id}`}>   Apresentação & Comentários</a>
                      <div className="collapse" id={`clps-${object.data._id}`}>
                        <span>Datas da apresentação:{' '}
                        Por favor checar <a href="https://seminario.ccsa.ufrn.br/programacao" target="_blank">aqui</a>
                        { !object.data.consolidation &&
                            <span>Datas podem ser encontradas em seminario.ccsa.ufrn.br</span>
                        }
                        <br/></span>
                        { object.data.consolidation &&
                          <span>{object.data.consolidation.location}</span>
                        }
                        { !object.data.consolidation &&
                          <span>Localização da apresentação - Por favor consultar em seminario.ccsa.ufrn.br</span>
                        }
                        <br/>
                        <span>Comentários dos coordenadores do GT:{' '}{object.data.comment}</span>
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
                      object.data.state == 'present' ?
                      'Apresentado' :
                      'Indefinido'
                    }
                    { object.data.state === 'present' &&
                      object.data.cert &&
                      <div style={{marginTop: '3px'}}>
                        <a href={`/certificado/${object.data.cert}`} target="_blank" className="btn btn-sm btn-info">Certificado</a>
                      </div>
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
