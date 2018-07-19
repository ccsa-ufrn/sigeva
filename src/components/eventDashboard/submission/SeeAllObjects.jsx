import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserPicker from '../../userPicker/userPicker';

class EditSubmission extends Component {
  constructor(props) {
    super(props);

    let thematicGroups = [];
    if (this.props.entity.slug == 'teachingcases') {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name === 'Casos para Ensino'));
    } else {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name !== 'Casos para Ensino'));
    }

    let thematicGroup = null;
    if (thematicGroups.length > 0) {
      thematicGroup = this.props.objectToEdit.data.thematicGroup.data._id;
    }
    
    let authors = null;
    if (this.props.objectToEdit.data.authors.length > 0) {
      authors = this.props.objectToEdit.data.authors;
    }

    this.state = {
      title: "",
      _id: "",
      abstract: "",
      keywords: "",
      thematicGroup: thematicGroup,
      users: authors,
      files: [],
      thematicGroups: thematicGroups,
    }

    this.changeUsers = this.changeUsers.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeAbstract = this.changeAbstract.bind(this);
    this.changeKeywords = this.changeKeywords.bind(this);
    this.changeTG = this.changeTG.bind(this);
    this.addFile = this.addFile.bind(this);
    this.doSubmitObject = this.doSubmitObject.bind(this);
  }

  componentDidMount() {
    if (this.props.objectToEdit.length !== 0) {
      this.setState({
        title: this.props.objectToEdit.data.title,
        abstract: this.props.objectToEdit.data.abstract,
        keywords: this.props.objectToEdit.data.keywords,
        thematicGroup: this.props.objectToEdit.data.thematicGroup.data._id,
        users: this.props.objectToEdit.data.authors.map(authors => authors._id),
        _id: this.props.objectToEdit._id,
        files: [],
      })
    }
  }

  changeTitle(e) {
    const target = e.nativeEvent.target;
    this.setState({
      title: target.value,
    });
  }

  changeAbstract(e) {
    const target = e.nativeEvent.target;
    this.setState({
      abstract: target.value,
    });
  }

  changeKeywords(e) {
    const target = e.nativeEvent.target;
    this.setState({
      keywords: target.value,
    });
  }

  changeTG(e) {
    const target = e.nativeEvent.target;
    this.setState({
      thematicGroup: target.value,
    });
  }

  changeUsers(users_) {
    this.setState({
      users: users_,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let thematicGroups = [];

    if (this.props.entity.slug == 'teachingcases') {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name === 'Casos para Ensino'));
    } else {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name !== 'Casos para Ensino'));
    }

    if (this.state.thematicGroups.length != thematicGroups.length) {
      this.setState({
        thematicGroups: thematicGroups,
      });
    }

    if (this.state.thematicGroup == null) {
      if (thematicGroups.length > 0) {
        this.setState({
          thematicGroup: this.props.objectToEdit.data.thematicGroup.data._id,
        });
      }
    }
  }

  addFile(file) {
    const newFiles = this.state.files;
    newFiles.push(file._id);
    this.setState({
      files: newFiles
    });
  }

  doSubmitObject() {
    this.props.submitObject(this.props.entity.slug, this.state);
  }

  render() {
    return (
      <div>
        <h5><strong>Submissão do tipo "{this.props.entity.name}"</strong></h5>
        <div className="form-group">
          <label htmlFor="form-title">Título do trabalho</label>
          <input value={this.state.title} id="form-title" className="form-control" onChange={this.changeTitle} />
        </div>
        <div className="form-group">
          <label htmlFor="form-abstract">Resumo</label>
          <textarea value={this.state.abstract} id="form-abstract" className="form-control" onChange={this.changeAbstract}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="form-keywords">Palavras-chave</label>
          <input value={this.state.keywords} id="form-keywords" className="form-control" onChange={this.changeKeywords} />
        </div>
        <div className="form-group">
          <label htmlFor="form-tgs">Grupo temático</label>
          <select defaultValue={this.state.thematicGroup} id="form-tgs" className="form-control" onChange={this.changeTG}>
            { this.state.thematicGroups &&
              this.state.thematicGroups.map((tg) => {
                return (<option key={tg.data._id} value={tg.data._id}>{tg.data.name}</option>);
              })
            }
          </select><br/>
          <strong>Seleção de co-autores</strong><br/>
          <UserPicker
            eventId={this.props.eventId}
            maxAuthors={this.props.entity.data.maxAuthors}
            initialUserEmail={this.props.userEmail}
            onChange={this.changeUsers}
            users={this.state.users}
          />
          <div className="form-group">
            <button style={{width: '100%'}} className="btn btn-warning" onClick={() => this.props.setObjectToEdit([])}>Voltar</button>
          </div>
          <div className="form-group">
            <button style={{width: '100%'}} className="btn btn-success" onClick={() => this.props.editObject(this.props.entity.slug, this.state)}>Salvar alterações</button>
          </div>
        </div>
      </div>
    );
  }
}

class SeeAllObjectsPane extends Component {
  constructor(props) {
    super(props);
    this.setObjectToEdit = this.setObjectToEdit.bind(this);
  }

  setObjectToEdit(object) {
    this.props.setObjectToEdit(object);
  }

  componentDidMount() {
    this.props.loadAllObjects(this.props.entity);
    this.props.setObjectToEdit([]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.loadAllObjects(this.props.entity);
    }
  }

  changeObjectState(objectId, newState) {
    this.props.changeObjectState(this.props.entity, objectId, newState);
  }

  emitCertificate(objectId, type) {
    this.props.emitCertificate(this.props.entity, objectId, type);
  }

  render() {
    return(
      <div>
        <h5><strong>Todas submissões realizadas{' '}
          { this.props.allObjects &&
            `(${this.props.allObjects.length})`
          }
        </strong></h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Trabalho</th>
              <th>Autor(es)</th>
              <th>Grupo Temático</th>
              <th>Avaliação</th>
              <th>Marcar presença</th>
            </tr>
          </thead>
          <tbody>
            { this.props.allObjects &&
              this.props.allObjects.map((object) => {
                return (
                  <tr key={object._id}>
                    <td><strong>{object.data.title}</strong><br/>
                      {
                        object.data.files.map((file, idx) => {
                          return (<a href={`/file/download/${file}`}>Arquivo {idx}<br/></a>);
                        })
                      }
                    </td>
                    <td>
                      {
                        object.data.authors.map((author) => {
                          return (<span key={author._id}>{`${author.name} (${author.email})`}<br/></span>)
                        })
                      }
                    </td>
                    <td>{object.data.thematicGroup.data.name}</td>
                    <td>
                    { object.data.state === 'waiting_evaluation' ?
                      <div>
                        <span className="badge badge-info">Aguardando avaliação</span>
                      </div> :
                      <div>
                        {
                          object.data.state === 'approved' ?
                            <span className="badge badge-success">Trabalho aprovado</span> :
                          object.data.state === 'rejected' ?
                            <span className="badge badge-danger">Trabalho rejeitado</span> :
                          object.data.state === 'present' ?
                            <span className="badge badge-success">Trabalho apresentado</span> :
                            <span className="badge badge-danger">Indefinido</span>
                        }
                      </div>
                    }
                    </td>
                    <td>
                      { object.data.state === 'approved' &&
                        <div>
                          <a className="btn btn-sm btn-success" onClick={()=> this.changeObjectState(object.data._id, 'present')}>Marcar presença</a>
                        </div>
                      }
                      { object.data.state === 'present' &&
                        <div>
                          <a className="btn btn-sm btn-warning" onClick={()=> this.changeObjectState(object.data._id, 'approved')}>Desmarcar presença</a>
                        </div>
                      }
                      { object.data.state === 'present' &&
                        !object.data.cert &&
                        <div style={{marginTop: '3px'}}>
                          <a className="btn btn-sm btn-info" onClick={() => this.emitCertificate(object._id, 'presentation')}>Emitir certificado</a>
                        </div>
                      }
                      { object.data.state === 'present' &&
                        object.data.cert &&
                        <div style={{marginTop: '3px'}}>
                          <a href={`/certificado/${object.data.cert}`} target="_blank" className="btn btn-sm btn-info">Certificado</a>
                        </div>
                      }
                      <button className="btn btn-sm btn-dark" onClick={() => this.setObjectToEdit(object)}>Editar submissão</button>
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
    if(this.props.submission.objectToEdit.length !== 0) {
      return (<EditSubmission entity={this.props.submission.entity} 
                              thematicGroups={this.props.thematicGroups}
                              objectToEdit={this.props.submission.objectToEdit} 
                              setObjectToEdit={this.props.setObjectToEdit} 
                              editObject={this.props.editObject} 
                              eventId={this.props.eventId} />)
    } else {
      return (
        <SeeAllObjectsPane allObjects={this.props.submission.allObjects} 
                           loadAllObjects={this.props.loadAllObjects} 
                           changeObjectState={this.props.changeObjectState}
                           setObjectToEdit={this.props.setObjectToEdit} 
                           entity={this.props.entity}/>
      )
    }
  }
}

export default SeeAllObjects;
