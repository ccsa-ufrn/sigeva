import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

class RecoverPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      message: '',
    }

    this.doHandleChange = this.doHandleChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
  }

  doHandleChange(e) {
    const target = e.nativeEvent.target;
    this.setState({
      email: target.value,
    });
  }

  doSubmit() {
    this.props.requirePasswordRecovering(this.state.email);
    this.setState({message: 'Foi enviado um e-mail com instruções para recuperação de senha'});
  }

  render() {
    if (this.props.logged) {
      return(<Redirect to='/dashboard' />);
    } else {
      return (
        <MainLayout>
          <div className='row' >
            <div className='col-md-6'>
              <div className="card board" id="login-board">
                <div className="card-header">
                  Recuperar senha
                </div>
                <div className="card-body">
                  <div className="form-group row">
                    <label htmlFor="email-login-sgv" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input id="email-login-sgv" type="email" name="email" onChange={this.doHandleChange} className="form-control form-control-sm" aria-describedby="emailHelp"/>
                    </div>
                  </div>
                  <button onClick={this.doSubmit} className="btn btn-success">Recuperar senha</button><br/><br/>
                  {this.state.message}
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      );
    }
  }
}

export default RecoverPasswordPage;
