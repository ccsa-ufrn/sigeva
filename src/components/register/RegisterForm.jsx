import React, { Component } from 'react';

class RegisterForm extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-8">
          <form className="form">
            <div className="form-group">
              <label>Nome completo</label>
              <input className="form-control" type="text" name="name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" name="email" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Senha</label>
                <input className="form-control" type="password" name="password" />
              </div>
              <div className="form-group col-md-6">
                <label>Repetir senha</label>
                <input className="form-control" type="password" name="password-repeat" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
