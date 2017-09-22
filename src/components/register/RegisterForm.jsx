import React, { Component } from 'react';

import InputForm from './InputForm';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.doHandleChange = this.doHandleChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
  }

  doHandleChange(event) {
    const target = event.nativeEvent.target;
    this.props.register.handleChange(target.name, target.value);
  }

  doSubmit(event) {
    this.props.register.submit(event, this.props.register.fields);
  }

  getErrorByField(field) {
    let error = null;
    this.props.register.validation_errors.forEach((err) => {
      if (err.field === field) {
        error = err;
      }
    });
    return error;
  }

  render() {
    if (this.props.register.fields_loading) {
      return(<span>Carregando campos para registro...</span>);
    } else if (this.props.register.register_success) {
      return(<span>Nova conta registrada com sucesso.</span>);
    } else if (this.props.register.system_failure) {
      return(<span>O sistema está atualmente indisponível para esta ação.</span>);
    } else {
      return(
        <div className="row">
          <div className="col-md-8">
            <form className="form" onSubmit={this.doSubmit}>
              <InputForm request={{
                _id: "fixed1",
                name: "name",
                readableName: "Nome completo",
                HTMLtype: "text"
              }} handleChange={this.doHandleChange} error={this.getErrorByField('name')} />

              <InputForm request={{
                _id: "fixed2",
                name: "email",
                readableName: "Email",
                HTMLtype: "email"
              }} handleChange={this.doHandleChange} error={this.getErrorByField('email')} />

              <div className="form-row">
                <div className="col-md-6">
                  <InputForm request={{
                    _id: "fixed3",
                    name: "password",
                    readableName: "Senha",
                    HTMLtype: "password"
                  }} handleChange={this.doHandleChange} error={this.getErrorByField('password')} />
                </div>
                <div className="col-md-6">
                  <InputForm request={{
                    _id: "fixed4",
                    name: "repeat_password",
                    readableName: "Repetir senha",
                    HTMLtype: "password"
                  }} handleChange={this.doHandleChange} error={this.getErrorByField('repeat_password')} />
                </div>
              </div>
              {this.props.register.fields_requests.map( request => (
                <InputForm
                  request={request}
                  key={request._id}
                  handleChange={this.doHandleChange}
                  error={this.getErrorByField(request.name)} />
              ))}
              <input value="Criar conta" className="btn btn-success" type="submit" />
              {this.props.register.submition_loading &&
                <span> Submetendo registro...</span>
              }
            </form>
          </div>
        </div>
      );
    }
  }

  submit(ev) {
    ev.preventDefault();
    this.setState({validation_errors: []});

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      timeout: 3000,
      body: JSON.stringify(this.state.values)
    };
    fetch('/api/user', config)
      .then(response => {
        return response.json();
        //throw new TypeError("We haven't got JSON");
      })
      .then((json) => {
        if (json.error) {
          this.setState({validation_errors: json.data});
        } else {
          this.setState({register_success: true});
        }
      });
  }
}

export default RegisterForm;
