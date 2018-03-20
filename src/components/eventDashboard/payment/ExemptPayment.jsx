import React, { Component } from 'react';
import { findUserByEmail } from '../../../actions/userPicker';

class ExemptPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }

    this.changeEmail = this.changeEmail.bind(this);
    this.queryUserAndExempt = this.queryUserAndExempt.bind(this);
  }

  changeEmail(e) {
    const target = e.nativeEvent.target;
    this.setState({
      email: target.value,
    });
  }

  queryUserAndExempt() {
    findUserByEmail(this.state.email, this.props.eventId)
      .then((json) => {
        if (!json.error) {
          this.props.exemptUser(json.data._id);
          this.setState({ email: '' });
        }
      });
  }

  componentDidMount() {
    this.props.loadExemptsList();
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Participantes isentos</th>
            </tr>
          </thead>
          <tbody>
            { this.props.exemptsList &&
              this.props.exemptsList.map((exempt) => {
                return (
                  <tr key={exempt._id}>
                    <td>{exempt.data.user.name} ({exempt.data.user.email})</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <label>Insira o email do usuário para adicioná-lo à lista de isentos</label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" onChange={this.changeEmail} value={this.state.email} />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" onClick={this.queryUserAndExempt}>Isentar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExemptPayment;
