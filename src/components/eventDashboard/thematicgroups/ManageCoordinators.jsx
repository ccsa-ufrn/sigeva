import React, { Component } from 'react';
import { findUserByEmail } from '../../../actions/userPicker';

class ManageCoordinators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualTgId: null,
      actualTgCoordinators: [],
      emailInput: '',
      userNotFound: false,
    }

    this.changeTG = this.changeTG.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.getCoordinatorsByTG = this.getCoordinatorsByTG.bind(this);
    this.findAndAddUserByEmail = this.findAndAddUserByEmail.bind(this);
    this.deleteCoordinator = this.deleteCoordinator.bind(this);
  }

  getCoordinatorsByTG(id) {
    const newCurrTg = this.props.thematicGroups.thematicGroups
      .find(e => e._id == id);
    if (newCurrTg) {
      return newCurrTg.data.coordinators;
    } else {
      return [];
    }
  }

  changeTG(e) {
    const target = e.nativeEvent.target;
    this.setState({
      actualTgId: target.value,
      actualTgCoordinators: this.getCoordinatorsByTG(target.value),
    });
  }

  changeEmail(e) {
    const target = e.nativeEvent.target;
    this.setState({
      emailInput: target.value,
    });
  }

  findAndAddUserByEmail() {
    this.setState({
      userNotFound: false,
    });

    const findUser = this.state.actualTgCoordinators.find((el => el.email == this.state.emailInput));

    if (findUser) {
      return;
    } else {
      findUserByEmail(this.state.emailInput, this.props.eventId)
        .then((json) => {
          if (!json.error) {
            let coords = this.state.actualTgCoordinators.map(el => el._id);
            coords.push(json.data._id);
            this.props.updateThematicGroupCoordinators(this.state.actualTgId, coords);
            this.setState({
              emailInput: '',
              actualTgCoordinators: this.getCoordinatorsByTG(this.state.actualTgId),
            });
          } else {
            this.setState({
              userNotFound: true,
            });
          }
        });
    }
  }

  deleteCoordinator(coordinatorId) {
    const newCoords = this.state.actualTgCoordinators.filter(el => el._id !== coordinatorId);
    this.props.updateThematicGroupCoordinators(this.state.actualTgId, newCoords);
    this.setState({
      actualTgCoordinators: newCoords,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.thematicGroups.thematicGroups.length > 0) {
      if (prevState.actualTgId == null) {
        this.setState({
          actualTgId: this.props.thematicGroups.thematicGroups[0]._id,
          actualTgCoordinators: this.getCoordinatorsByTG(this.props.thematicGroups.thematicGroups[0]._id),
        });
      } else {
        const currTGonOld = this.props.thematicGroups.thematicGroups
          .find(e => e._id == this.state.actualTgId);
        if (currTGonOld) {
          if (currTGonOld.data.coordinators.length != this.state.actualTgCoordinators.length) {
            this.setState({
              actualTgCoordinators: this.getCoordinatorsByTG(this.state.actualTgId),
            });
          }
        }
      }
    }
  }

  render() {
    return(
      <div>
        <h5><strong>Gerenciar Coordenadores de GT</strong></h5>
        <div className="form-group">
          <label htmlFor="tg-select">Grupo Temático</label>
          <select id="tg-select" className="form-control" onChange={this.changeTG}>
            {
              this.props.thematicGroups.thematicGroups !== null &&
              this.props.thematicGroups.thematicGroups.map((thematicGroup) => {
                return(
                  <option key={thematicGroup._id} value={thematicGroup._id}>
                    {thematicGroup.data.name}
                  </option>
                );
              })
            }
          </select>
        </div>
        { this.state.actualTgId !== null &&
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Coordenadores</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.actualTgCoordinators.map((coordinator) => {
                    return(
                      <tr key={coordinator._id}>
                        <td>
                          {coordinator.name}{' ('}{coordinator.email}{')'}
                          <button
                            style={{float: 'right'}}
                            className="btn btn-danger"
                            onClick={() => {this.deleteCoordinator(coordinator._id)}}>
                              Remover
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            <div className="form-group">
              <label>Adicionar coordenador por email</label>
              <div className="input-group mb-3">
                <input type="text" value={this.state.emailInput} className="form-control" placeholder="Email" onChange={this.changeEmail}/>
                <div className="input-group-append">
                  <button className="btn btn-outline-primary" onClick={this.findAndAddUserByEmail}>Adicionar</button>
                </div>
              </div>
              { this.state.userNotFound &&
                <div className="alert alert-danger" role="alert">
                  Usuário não encontrado no evento
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ManageCoordinators;
