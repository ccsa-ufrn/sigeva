import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginBoard extends Component {
  constructor(props) {
    super(props);

    this.doHandleChange = this.doHandleChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
  }

  doHandleChange(event) {
    const target = event.nativeEvent.target;
    this.props.handleChange(target.name, target.value);
  }

  doSubmit(event) {
    const fields = {
      email: this.props.email,
      password: this.props.password,
    };

    this.props.submit(event, fields);
  }

  render() {
    return (
      <div className="card board" id="login-board">
        <div className="card-header">
          Acesso
        </div>
        <div className="card-body">
          <form id="login-form" onSubmit={this.doSubmit}>
            <div className="form-group row">
              <label htmlFor="email-login-sgv" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input id="email-login-sgv" type="email" name="email" onChange={this.doHandleChange} className="form-control form-control-sm" aria-describedby="emailHelp"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password-login-sgv" className="col-sm-3 col-form-label">Senha</label>
              <div className="col-sm-9">
                <input id="password-login-sgv" type="password" name="password" onChange={this.doHandleChange} className="form-control form-control-sm"/>
                <Link to={'/recover-password'} className="small">Esqueceu a senha?</Link>
              </div>
            </div>
            { this.props.errorMessage !== '' && !this.props.doingLogin && !this.props.success &&
              <div className="form-error-message form-group row">
                <div className="col-sm-9">
                  <span className="form-error-message">{ this.props.errorMessage }</span>
                </div>
              </div>
            }
            { this.props.doingLogin &&
              <div>
                Acessando conta...
              </div>
            }
            <button type="submit" className="btn btn-success">Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginBoard;
