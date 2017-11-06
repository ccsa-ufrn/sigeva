import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InscriptionBoardHeader extends Component {
  render() {
    return(
      <div className='card board'>
        <div className='card-header'>
          Inscrição
        </div>
        <div className='card-body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class InscriptionBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '-1',
      submiting: false,
    };

    this.changeRole = this.changeRole.bind(this);
    this.submitEnroll = this.submitEnroll.bind(this);
  }

  hasPublicRole() {
    if (this.props.event.relationship) {
      const publicRoles = this.props.event.relationship.filter((role) => {
        return role.type === 'public';
      });
      return publicRoles.length > 0;
    }
    return false;
  }

  hasPrivateRole() {
    if (this.props.event.relationship) {
      const publicRoles = this.props.event.relationship.filter((role) => {
        return role.type === 'private';
      });
      return publicRoles.length > 0;
    }
    return false;
  }

  changeRole(event) {
    const value = event.target.value;
    this.setState({ role: value });
  }

  submitEnroll(event) {
    event.preventDefault();
    if (this.state.role !== '-1') {
      this.props.submitEnroll(this.state.role);
      this.setState({ role: '-1', submiting: true });
    }
  }

  render() {
    if (this.props.userSession.logged_user) {
      if (!this.props.event.loading && this.props.event.roles) {
        if (this.hasPublicRole()) {
          return (
            <InscriptionBoardHeader>
              <span>Você possui inscrição neste evento.</span><br/><br/>
              <Link to={`/event/${this.props.event.id}/dashboard`} className='btn btn-success form-control'>Acessar painel do evento</Link>
            </InscriptionBoardHeader>
          );
        } else {
          const currentDate = new Date().getTime();
          const enrollmentPeriodBegin = new Date(this.props.event.enrollmentPeriod.begin).getTime();
          const enrollmentPeriodEnd = new Date(this.props.event.enrollmentPeriod.end).getTime();

          let component;
          if (currentDate < enrollmentPeriodBegin) {
            component = (
              <InscriptionBoardHeader>
                <span>Este evento ainda não está aberto para inscrições</span>
              </InscriptionBoardHeader>
            );
          } else if (currentDate > enrollmentPeriodEnd) {
            component = (
              <InscriptionBoardHeader>
                <span>Este evento já encerrou o período de inscrições</span>
              </InscriptionBoardHeader>
            );
          } else {
            component = (
              <InscriptionBoardHeader>
                <div className='form-group'>
                  <label htmlFor='enrollAs'>Inscrever-se como</label>
                  <select className='form-control' id='enrollAs' onChange={this.changeRole}>
                    <option value='-1'>Selecione o tipo de inscrição</option>
                    {
                      this.props.event.roles.map((role, idx) => {
                        return (
                          <option key={idx} value={role._id}>{role.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <button onClick={this.submitEnroll} className='btn btn-danger form-control' disabled={(this.state.role == '-1')}>Efetuar inscrição</button>
                { this.state.submiting &&
                  <span>Realizando inscrição...</span>
                }
              </InscriptionBoardHeader>
            );
          }
          return (
            <div>
              { component }
              {this.hasPrivateRole() &&
                <div className='card board'>
                  <div className='card-body'>
                    <span>Você possui vínculo através de papel privado com este evento.</span><br/><br/>
                    <Link to={`/dashboard/event/${this.props.event.id}`} className='btn btn-success form-control'>Acessar controle do evento</Link>
                  </div>
                </div>
              }
            </div>
          );
        }
      } else {
        return (<div>Carregando...</div>);
      }
    } else {
      return(
        <InscriptionBoardHeader>
          <div className='alert alert-danger'>
            Para efetuar a inscrição é necessário estar logado. <Link to='/login'>Fazer login</Link>
          </div>
        </InscriptionBoardHeader>
      );
    }
  }
}

export default InscriptionBoard;
