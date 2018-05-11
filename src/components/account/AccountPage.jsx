import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import InputForm from '../register/InputForm';

import MainLayout from '../layout/MainLayout';

class AccountPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      fields: this.props.user.fields,
    };

    this.handleChange = this.handleChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.nativeEvent.target;
    if (target.name == 'name') {
      this.setState({name: target.value});
    } else if (target.name == 'email') {
      this.setState({email: target.value});
    } else {
      const newFields = this.state.fields.map((field) => {
        if (field.name == target.name) {
          return Object.assign({}, field, { value: target.value});
        } else {
          return field;
        }
      });

      this.setState({fields: newFields});
    }
  }

  doSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.state);
  }

  render() {
    const accountPath = [
      {
        active: false,
        name: 'Início',
        address: '/',
      },
      {
        active: true,
        name: 'Configurar conta',
        address: '/dashboard/account',
      },
    ];

    if (!this.props.register) {
      return (<span>Carregando campos para alteração...</span>);
    } else if (this.props.logged) {
      return (
        <MainLayout path={accountPath} >
          <div className='row'>
            <div className='col-md-8'>
              <form className='form' onSubmit={this.doSubmit}>
                <div className='form-group'>
                  <label htmlFor='form-name'>Nome completo</label>
                  <input onChange={this.handleChange} name='name' className='form-control' id='form-name' defaultValue={this.state.name} />
                </div>
                <div className='form-group'>
                  <label htmlFor='form-name'>Email</label>
                  <input onChange={this.handleChange} name='email' className='form-control' id='form-email' defaultValue={this.state.email} />
                </div>
                {this.state.fields.map( field => (
                  <div className='form-group' key={field._id}>
                    <label htmlFor={field._id}>{field.readableName}</label>
                    <input onChange={this.handleChange} className='form-control' id={field._id} name={field.name} defaultValue={field.value} />
                  </div>
                ))}
                <input value="Atualizar dados" className="btn btn-success" type="submit" />
              </form>
            </div>
          </div>
        </MainLayout>
      );
    } else {
      return (<Redirect to='/' />);
    }
  }
}

export default AccountPage;
