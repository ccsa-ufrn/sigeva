import React, { Component } from 'react';

class LoginBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
      logging: false
    }

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="card board" id="login-board">
        <div className="card-header">
          Acesso
        </div>
        <div className="card-body">
          <form id="login-form" onSubmit={this.submit}>
            <div className="form-group row">
              <label htmlFor="email-login-sgv" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input id="email-login-sgv" type="email" name="email" onChange={this.changeEmail} className="form-control form-control-sm" aria-describedby="emailHelp"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password-login-sgv" className="col-sm-3 col-form-label">Senha</label>
              <div className="col-sm-9">
                <input id="password-login-sgv" type="password" name="password" onChange={this.changePassword} className="form-control form-control-sm"/>
                <a href="" className="small">Esqueceu a senha?</a>
              </div>
            </div>
            { this.state.error !== null && !this.state.logging &&
              <div className="form-error-message form-group row">
                <div className="col-sm-9">
                  <span className="form-error-message">{ this.state.error }</span>
                </div>
              </div>
            }
            { this.state.logging &&
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

  submit(event) {
    event.preventDefault();

    if(this.state.email === '' || this.state.password === '') {
      this.setState({error: 'Insira email e senha para logar'});
      return;
    }
    this.setState({logging: true});

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(this.state)
    };

    this.setState({ error: '' });
    fetch('/api/user/authorize', config)
      .then(response => {
        this.setState({logging: false});
        return response.json();
      })
      .then(json => {
        if (json.error) {
          this.setState({error:'Conta com este email/senha não existe'});
        }
        console.log(json);
      });

  }
}

export default LoginBoard;
