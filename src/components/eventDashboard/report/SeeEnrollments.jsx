import React, { Component } from 'react';
import UserReport from './UserReport';

class SeeEnrollments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      roles: [],
      selectedRoles: [],
      selectedPayment: [],
    }

    this.toggleRole = this.toggleRole.bind(this);
    this.togglePayment = this.togglePayment.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    if (! this.props.enrollments) {
      this.props.loadEnrollments();
    }
  }

  componentDidUpdate() {
    if (this.props.enrollments && this.state.roles.length == 0) {
      const unique = [];
      this.props.enrollments.forEach((user) => {
        user.roles.forEach((role) => {
          if (!unique.includes(role)) {
            unique.push(role);
          }
        }, this);
      }, this);

      this.setState({
        roles: unique,
      });
    }
  }

  toggleRole(role) {
    if (!this.state.selectedRoles.includes(role)) {
      this.setState((prevState, props) => {
        return { selectedRoles: [...prevState.selectedRoles, role]}
      });
    } else {
      this.setState((prevState, props) => {
        return { selectedRoles: prevState.selectedRoles.filter((r) => r !== role)}
      });
    }
  }

  togglePayment(condition) {
    if (!this.state.selectedPayment.includes(condition)) {
      this.setState((prevState, props) => {
        return { selectedPayment: [...prevState.selectedPayment, condition]}
      });
    } else {
      this.setState((prevState, props) => {
        return { selectedPayment: prevState.selectedPayment.filter((r) => r !== condition)}
      });
    }
  }

  loadUser(uId) {
    this.props.loadUser(uId);
  }

  render() {
    if (this.props.selectedUser) {
      return <UserReport user={this.props.selectedUser} clearUser={this.props.clearUser} />
    }

    if (this.props.enrollments) {
      const filteredUsers = this.props.enrollments.filter((usr) =>{
        let sum = 0;

        const rolesIntersec = usr.roles.filter((role) => this.state.selectedRoles.includes(role), this);
        if (rolesIntersec.length > 0) {
          sum++;
        }

        if (usr.payment.approved == false && this.state.selectedPayment.includes('not-paid')) sum++;

        if (usr.payment.approved) {
          const receipts = usr.payment.receipts.filter((r) => r.data.status == 'approved' && r.data.type == 'receipt');
          if (receipts.length > 0 && this.state.selectedPayment.includes('approved')) sum++;

          const free = usr.payment.receipts.filter((r) => r.data.type == 'free');
          if (free.length > 0 && this.state.selectedPayment.includes('free')) sum++;
        }
        return sum >= 2;
      });

      return (
        <div>
          <h5><strong>Filtros</strong></h5>
          <div>
            Condição de pagamento:{' '}
            <label><input type="checkbox" onChange={()=>{ this.togglePayment('approved') }} /> Pagamento aprovado</label>{' '}
            <label><input type="checkbox" onChange={()=>{ this.togglePayment('free') }} /> Isento</label>{' '}
            <label><input type="checkbox" onChange={()=>{ this.togglePayment('not-paid') }} /> Sem pagamento / não aprovado</label>{' '}
          </div>
          { this.state.roles &&
            <div>
              Papel do usuário:{' '}
              {
                this.state.roles.map((role, idx) => {
                  return (
                    <label key={idx}><input className="checkbox" type="checkbox" value="idx" onChange={()=> {this.toggleRole(role)}} /> {role}{' '}</label>
                  )
                })
              }
            </div>
          }
          <h5><strong>Usuários selecionados</strong></h5>
          <div>Exibindo {filteredUsers.length} registros no total de {this.props.enrollments.length}</div>
          <table className="table">
            <tbody>
              {
                filteredUsers.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        {user.name} ({user.email})
                      </td>
                      <td>
                        <a href="#" onClick={() => { this.loadUser(user._id) }} className="btn btn-success">Relatório detalhado</a>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )

    } else {
      return (
        <div>Carregando registros...</div>
      );
    }
  }
}

export default SeeEnrollments;
