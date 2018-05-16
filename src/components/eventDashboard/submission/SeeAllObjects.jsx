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

  changeObjectState(objectId, newState) {
    this.props.changeObjectState(this.props.entity, objectId, newState);
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
                    <td><strong>{object.data.title}</strong><br/></td>
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
                          <span className="btn btn-success"><a onClick={()=> this.changeObjectState(object.data._id, 'present')}>Marcar presença</a></span> 
                        </div>
                      }
                      { object.data.state === 'present' &&
                        <div>
                          <span className="btn btn-warning"><a onClick={()=> this.changeObjectState(object.data._id, 'approved')}>Desmarcar presença</a></span> 
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

export default SeeAllObjects;
