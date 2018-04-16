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
            </tr>
          </thead>
          <tbody>
            { this.props.allObjects &&
              this.props.allObjects.sort((a, b) => a.data.thematicGroup.data.name > b.data.thematicGroup.data.name).map((object) => {
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
                            <span className="badge badge-danger">Trabalho rejeitado</span>
                        }
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
