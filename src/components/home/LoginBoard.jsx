import React, { Component } from 'react';

class LoginBoard extends Component {
  render() {
    return (
      <div className="card board" id="login-board">
        <div className="card-header">
          Acesso
        </div>
        <div className="card-body">
          <form id="login-form">
            <div className="form-group row">
              <label for="email-login-sgv" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input id="email-login-sgv" type="email" className="form-control form-control-sm" aria-describedby="emailHelp"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="password-login-sgv" className="col-sm-3 col-form-label">Senha</label>
              <div className="col-sm-9">
                <input id="password-login-sgv" type="password" className="form-control form-control-sm"/>
                <a href="" className="small">Esqueceu a senha?</a>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginBoard;
