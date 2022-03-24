import React, { Component } from 'react';

class SeeToApproveSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments : [], 
    }

    this.changeObjectState = this.changeObjectState.bind(this);
    this.changeComments = this.changeComments.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  changeObjectState(objectId, newState) {
    this.props.changeObjectState(this.props.entity, objectId, newState);
  }

  saveComment(objectId) {
    const newComment = this.state.comments.filter(comment => comment._id == objectId)[0].comment
    this.props.saveComment(this.props.entity, objectId, newComment);
  }

  changeComments(objectId, e) {
    const target = e.nativeEvent.target;
    const objects = this.props.submission.objectsToEvaluate.thematicGroups.map((tg_) => {
        return tg_.objects.map((object) => {
          if(object._id == objectId) {
            return({ '_id' : object._id, 'comment' : target.value })
          }
          return({'_id': object._id, 'comment': object.data.comment})
        })
    })[0]
    this.setState({ 
      comments: objects,
    });
  }

  componentDidMount() {
    this.props.loadObjectsToEvaluate(this.props.entity);
    this.props.loadSubmissionEntity(this.props.entity);
    const objects = this.props.submission.objectsToEvaluate.thematicGroups.map((tg_) => {
        return tg_.objects.map((object) => {
            return({ '_id' : object._id, 'comment' : object.data.comment })
        })
    })[0]
    this.setState({
      comments: objects,
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.submission.objectsToEvaluate != this.props.submission.objectsToEvaluate) {
      const objects = this.props.submission.objectsToEvaluate.thematicGroups.map((tg_) => {
          return tg_.objects.map((object) => {
              return({ '_id' : object._id, 'comment' : object.data.comment })
          })
      })[0]
      this.setState({
        comments: objects,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entity !== this.props.entity) {
      this.props.loadObjectsToEvaluate(nextProps.entity);
    }
  }
  
  render() {
    return(
      <div>
        <h5><strong>Trabalhos para avaliação</strong></h5>
        {
          this.props.submission.objectsToEvaluate &&
          this.props.submission.objectsToEvaluate.thematicGroups.map((tg_) => {
            return (
              <div key={tg_._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{tg_.name}</h5>
                    <table className="table">
                      <tbody>
                        { tg_.objects.length > 0 ?
                          tg_.objects.filter(obj => !obj.data.deleted).map((obj_) => {
                            return (
                              <tr key={obj_._id}>
                                <td>
                                  <div className="row">
                                    <div className="col-md-8">
                                      <strong>{obj_.data.title}</strong>{' '}
                                      <a data-toggle="collapse" href={`#clps-${obj_.data._id}`} aria-expanded="false" role="button" aria-controls={`#clps-${obj_.data._id}`}>expandir</a>
                                      <div className="collapse" id={`clps-${obj_.data._id}`}>
                                        <span style={{fontSize: '11pt'}}>Resumo: {obj_.data.abstract}</span>
                                        <br/><br/>
                                        <span style={{fontSize: '11pt'}}>Palavras-chave: {obj_.data.keywords}</span>
                                        <br/><br/>
                                        <div>
                                        <textarea onChange={(e) => this.changeComments(obj_._id, e)} defaultValue={ obj_.data.comment } className="form-control" style={{fontSize: '11pt', height: '100px'}} ></textarea>
                                        <button onClick={() => this.saveComment(obj_._id) } style={{width: '100%'}} className='btn btn-outline-primary btn-sm'>Salvar comentário</button>
                                        </div>
                                        {
                                          obj_.data.files.map((file) => {
                                            if (this.props.submission.entity.data) {
                                              const hiddenRequiredFile = this.props.submission.entity.data.ofRequiredFiles.find(fl => fl.fileType == "hidden");
                                              if (hiddenRequiredFile) {
                                                if (file.fileRequirement == hiddenRequiredFile.fileRequirement) {
                                                  return (<a key={file._id} className="btn btn-primary" href={`/file/download/${file._id}`} target="blank_">Arquivo para avaliação</a>);
                                                }
                                              }
                                            }
                                            return null;
                                          })
                                        }

                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      { obj_.data.state === 'waiting_evaluation' ?
                                        <div>
                                          <button onClick={()=> this.changeObjectState(obj_.data._id, 'approved')} className='btn btn-outline-success btn-sm'>Aprovar trabalho</button>{' '}
                                          <button onClick={()=> this.changeObjectState(obj_.data._id, 'rejected')} className='btn btn-outline-danger btn-sm'>Rejeitar trabalho</button>
                                        </div> :
                                        <div>
                                          {
                                            obj_.data.state === 'approved' ?
                                              <span className="badge badge-success">Trabalho aprovado</span> :
                                            obj_.data.state === 'rejected' ?
                                              <span className="badge badge-danger">Trabalho rejeitado</span> :
                                              <span className="badge badge-success">Trabalho apresentado</span> 
                                          }{' '}
                                          { obj_.data.state != 'present' &&
                                          <small><a onClick={()=> this.changeObjectState(obj_.data._id, 'waiting_evaluation')}>Desfazer avaliação</a></small>
                                          }
                                        </div>
                                      }
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )
                          }) :
                          <tr><td>Não existem trabalhos submetidos para este grupo de trabalho</td></tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div><br/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default SeeToApproveSubmissions;
