import React, { Component } from 'react';

class SeeToApproveSubmissions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadToApproveSubmission(this.props.entity);
  }

  render() {
    return(
      <div>
        <h5><strong>Submissões que necessitam de aprovação</strong></h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Arquivos</th>
              <th>Aprovar</th>
            </tr>
          </thead>
          <tbody>
            { this.props.submission.objectsToApprove &&
              this.props.submission.objectsToApprove.map((object) => {
                object.data.files = object.data.files.filter(el => el.fileRequirement.name == 'Pôster para avaliação (SEM informações de autoria)')
                return (
                  <tr key={object._id}>
                    <td>{object.data.title}</td>
                    <td>{ object.data.files &&
                      object.data.files.map((file) => {
                        return (<span key={file._id}><a href={`/file/download/${file._id}`} target='_blank'>{file.fileRequirement.name}</a><br/></span>)
                      })
                    }</td>
                    <td>
                      {/* <button onClick={props.approveSubmission(object._id, this.props.entity)} className='btn btn-outline-success btn-sm'>Aprovar pagamento</button>{' '}
                      <button onClick={props.rejectSubmission(object._id, this.props.entity)} className='btn btn-outline-danger btn-sm'>Rejeitar pagamento</button> */}
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

export default SeeToApproveSubmissions;
