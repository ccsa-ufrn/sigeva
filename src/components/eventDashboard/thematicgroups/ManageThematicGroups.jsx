import React, { Component } from 'react';

class CreateTG extends Component {
  constructor (props) {
    super(props);

    let initialAreaId = null;


    this.state = {
      thematicGroupName: '',
      description: '',
      areaId: null,
    };

    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeArea = this.changeArea.bind(this);
    this.createThematicGroup = this.createThematicGroup.bind(this);
  }

  changeName(e) {
    const target = e.nativeEvent.target;
    this.setState({
      thematicGroupName: target.value,
    });
  }

  changeDescription(e) {
    const target = e.nativeEvent.target;
    this.setState({
      description: target.value,
    });
  }

  changeArea(e) {
    const target = e.nativeEvent.target;
    this.setState({
      areaId: target.value,
    });
  }

  createThematicGroup() {
    this.props.createThematicGroup(this.state);
    this.setState({
      thematicGroupName: '',
      description: '',
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.areaId == null) {
      if (this.props.areas.length > 0) {
        this.setState({
          areaId: this.props.areas[0]._id,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h5><strong>Criar grupo temático</strong></h5>
        <div className="form-group">
          <label htmlFor="create-tg-name">Nome do Grupo Temático</label>
          <input value={this.state.thematicGroupName} type="text" id="create-tg-name" className="form-control" onChange={this.changeName} />
        </div>
        <div className="form-group">
          <label htmlFor="create-tg-area">Área</label>
          <select htmlFor="create-tg-area" className="form-control" onChange={this.changeArea}>
            {
              this.props.areas !== null &&
              this.props.areas.map((area) => {
                return (
                  <option value={area._id} key={area._id}>
                    {area.name}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="create-tg-description">Ementa</label>
          <textarea
            id="create-tg-description"
            onChange={this.changeDescription}
            className="form-control"
            value={this.state.description}
          >
          </textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.createThematicGroup}>Criar Grupo Temático</button>
        </div>
      </div>
    );
  }
}

class ListGTs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.thematicGroups);
    return(
      <div>
        <h5><strong>Lista de Grupos Temáticos</strong></h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Grupo Temático</th>
              <th scope="col">Coordenadores</th>
            </tr>
          </thead>
          <tbody>
            { this.props.thematicGroups !== null &&
              this.props.thematicGroups.map((thematicGroup) => {
                return (
                  <tr key={thematicGroup._id}>
                    <td>
                      {thematicGroup.data.name}{' '}
                      <a
                        data-toggle="collapse"
                        href={`#collapse-${thematicGroup.data._id}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${thematicGroup.data._id}`}
                        style={{float:'right'}}
                      >exibir ementa</a>
                      <div className="collapse" id={`collapse-${thematicGroup.data._id}`}>
                        {thematicGroup.data.description}
                      </div>
                    </td>
                    <td>
                      {
                        thematicGroup.data.coordinators.map((coord) => {
                          return (<div key={coord._id}><span>{coord.name}</span><br/></div>);
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

class ManageThematicGroups extends Component {
  constructor(props) {
    super(props);

    this.createThematicGroup = this.createThematicGroup.bind(this);
  }

  componentDidMount() {
    this.props.loadThematicGroupsAreasAreas();
    this.props.loadThematicGroups();
  }

  createThematicGroup(data) {
    this.props.createThematicGroup(data);
  }

  render() {
    return(
      <div>
        <CreateTG
          areas={this.props.thematicGroupsAreas.areas}
          createThematicGroup={this.createThematicGroup}
        />
        <ListGTs
          thematicGroups={this.props.thematicGroups.thematicGroups}
        />
      </div>
    );
  }
}

export default ManageThematicGroups;
