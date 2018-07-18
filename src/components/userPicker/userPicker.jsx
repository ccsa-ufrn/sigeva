import React, { Component } from 'react';
import { findUserByEmail } from '../../actions/userPicker';

class UserPicker extends Component {
  constructor(props) {
    super(props);
    // { name: ---, email: id, deletable }
    let users = [];
    if(this.props.users) {
      users = this.props.users.map(user => { user.deletable = true; return user});
    }

    this.state = {
      users: users,
      query: '',
      notFound: false,
    };


    this.changeQuery = this.changeQuery.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.findAndAddUserFromQuery = this.findAndAddUserFromQuery.bind(this);
    this.addUserByEmail = this.addUserByEmail.bind(this);
    this.notifyParents = this.notifyParents.bind(this);
  }

  changeQuery(e) {
    const target = e.nativeEvent.target;
    this.setState({
      query: target.value
    });
  }

  notifyParents() {
    this.props.onChange(this.state.users);
  }

  removeUser(userId) {
    const newUsers = this.state.users.filter(el => el._id !== userId );
    this.setState({users: newUsers}, () => { this.notifyParents() });
  }

  componentDidMount() {
    if (this.props.initialUserEmail !== undefined) {
      this.addUserByEmail(this.props.initialUserEmail, false);
      this.notifyParents();
    }
  }

  findAndAddUserFromQuery() {
    this.addUserByEmail(this.state.query, true);
  }

  addUserByEmail(email, deletable) {
    findUserByEmail(email, this.props.eventId)
      .then((json) => {
        if (!json.error) {
          this.setState((prevState, props) => {
            if(!(prevState.users.some(x => x._id === json.data._id))
              && prevState.users.length < this.props.maxAuthors){
              const nextState = prevState.users.push({
                name: json.data.name,
                _id: json.data._id,
                deletable,
              });
              return Object.assign({}, nextState, { notFound: false });
            }
          });
          this.notifyParents();
        } else {
          this.setState({notFound: true});
        }
      });
  }

  render() {
    return(
      <div className="user-picker">
        <small>Digite o e-mail de um usuário inscrito no evento para adicioná-lo. A quantidade máxima é {this.props.maxAuthors}</small>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={this.state.query} onChange={this.changeQuery} />
          { this.state.users.length < this.props.maxAuthors &&
            <div className="input-group-append">
              <button className="btn btn-outline-primary" onClick={this.findAndAddUserFromQuery}>Adicionar</button>
            </div>
          }
        </div>
        { this.state.notFound &&
          <small style={{color: 'red'}}>Usuário não encontrado</small>
        }
        <ul className="list-group list-group-flush">
          { this.state.users &&
            this.state.users.map((user) => {
              return (
                <li key={user._id} className="list-group-item">{user.name}
                  { user.deletable &&
                  <button onClick={()=> {this.removeUser(user._id)}} style={{float: "right"}} className="btn btn-danger"><i className="fa fa-trash-o"></i></button>
                  }
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
