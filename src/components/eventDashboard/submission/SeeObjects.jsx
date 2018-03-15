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
                    <td>{object.data.title}</td>
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
