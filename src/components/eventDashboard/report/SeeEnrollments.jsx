import React, { Component } from 'react';

class SeeEnrollments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      roles: [],
    }
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

  render() {
    if (this.props.enrollments) {
      return (
        <div>
          <h5><strong>Filtros</strong></h5>
          <div>
            Condição de pagamento:{' '}
            <label><input type="checkbox" /> Pagamento aprovado</label>{' '}
            <label><input type="checkbox" /> Sem pagamento / não aprovado</label>{' '}
          </div>
          { this.state.roles &&
            <div>
              Papel do usuário:{' '}
              {
                this.state.roles.map((role, idx) => {
                  return (
                    <label key={role.idx}><input className="checkbox" type="checkbox" value="idx" /> {role}{' '}</label>
                  )
                })
              }
            </div>
          }
          <h5><strong>Usuários selecionados</strong></h5>
          <table className="table">
            <tbody>
              {
                this.props.enrollments.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        {user.name} ({user.email})
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
