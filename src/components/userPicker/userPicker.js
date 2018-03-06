import React, { Component } from 'react';
import { findUserByEmail } from '../../actions/userPicker';

class UserPicker extends Component {
  constructor(props) {
    super(props);
    // propriedades
    // max_authors

    this.state = {
      users: [],
      query: '',
      notFound: false,
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.findAndAddUser = this.findAndAddUser.bind(this);
  }

  changeQuery(e) {
    const target = e.nativeEvent.target;
    this.setState({
      query: target.value
    });
  }

  findAndAddUser() {
    findUserByEmail(this.state.query, this.props.eventId)
      .then((json) => {
        if (!json.error) {
          this.setState((prevState, props) => {
            const nextState = prevState.users.push(json.data);
            return Object.assign({}, nextState, { notFound: false });
          });
        } else {
          this.setState({notFound: true});
        }
      });
  }

  render() {
    console.log(this.state);
    return(
      <div className="user-picker">
        <strong>Seleção de co-autores</strong><br/>
        <small>Digite o e-mail de um usuário inscrito no evento para adicioná-lo como co-autor do {this.props.type}</small>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={this.state.query} onChange={this.changeQuery} />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" onClick={this.findAndAddUser}>Adicionar</button>
          </div>
        </div>
        { this.state.notFound &&
          <small style={{color: 'red'}}>Usuário não encontrado</small>
        }
        <ul className="list-group list-group-flush">
          { this.state.users &&
            this.state.users.map((user) => {
              return (
                <li key={user._id} className="list-group-item">{user.name}
                  <button style={{float: "right"}} className="btn btn-danger"><i className="fa fa-trash-o"></i></button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default UserPicker;
