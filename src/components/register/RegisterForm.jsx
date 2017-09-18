import React, { Component } from 'react';

import InputForm from './InputForm';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields_requests: [],
      validation_errors: [],
      fields_loading: true,
      fields_load_error: true,
      register_success: false,
      values : {
        name: "",
        email: "",
        password: "",
        repeat_password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    const target = event.nativeEvent.target;
    this.setState((prevState, props) => {
      let newValues = prevState.values;
      newValues[target.name] = target.value;
      return { values: newValues };
    });
    this.validadePassword(target);
  }

  componentDidMount() {
    const config = { method: 'GET', mode: 'cors', timeout: 3000 };
    fetch('/api/system/register_fields_requests', config)
      .then(response => {
        if (response.ok)
          return response.json();
        throw new TypeError("We haven't got JSON");
      })
      .then(json => {
        json.data.forEach((f_request) => {
          this.setState((prevState, props) => {
            let newValues = prevState.values;
            newValues[f_request.name] = "";
            return { values: newValues };
          });
        });
        this.setState({ fields_requests: json.data, fields_loading: false, fields_load_error: false });
      })
      .catch(err => {
        this.setState({ fields_load_error: true, fields_loading: false });
      });
  }

  getErrorByField(field) {
    let error = null;
    this.state.validation_errors.forEach((err) => {
      if (err.field === field) {
        error = err;
      }
    });
    return error;
  }

  addError(field, message) {
    this.setState((prevState, props) => {
      prevState.validation_errors.push({
        field,
        message
      });
      return { validation_errors: prevState.validation_errors }
    });
  }

  clearErrors(field) {
    this.setState((prevState) => {
      const new_validation_errors = prevState.validation_errors.filter((el) => {
        return (el.field !== field);
      });
      return { validation_errors: new_validation_errors };
    });
  }

  validadePassword(target) {
    if (target.name == 'password') {
      if (target.value.length < 5 || target.value.length > 20) {
        this.addError('password', 'A senha deve possuir entre 5 e 20 caracteres');
      } else {
        this.clearErrors('password');
      }
    }

    if (target.name == "repeat_password" || (target.name == 'password' && this.state.values.repeat_password !== '')) {
      if (this.state.values.password !== target.value) {
        this.addError('repeat_password', 'A repetição não combina com a senha inserida');
      } else {
        this.clearErrors('repeat_password');
      }
    }
  }

  render() {
    if (this.state.fields_loading) {
      return(<span>Carregando campos para registro...</span>);
    } else if (this.state.fields_load_error) {
      return(<span>Não será possível fazer registro nesse momento. Tente novamente mais tarde.</span>);
    } else if (this.state.register_success) {
      return(<span>Nova conta registrada com sucesso.</span>);
    } else {
      return(
        <div className="row">
          <div className="col-md-8">
            <form method="post" action="#" className="form" onSubmit={this.submit}>
              <InputForm request={{
                _id: "fixed1",
                name: "name",
                readableName: "Nome completo",
                HTMLtype: "text"
              }} handleChange={this.handleChange} error={this.getErrorByField('name')} />

              <InputForm request={{
                _id: "fixed2",
                name: "email",
                readableName: "Email",
                HTMLtype: "email"
              }} handleChange={this.handleChange} error={this.getErrorByField('email')} />

              <div className="form-row">
                <div className="col-md-6">
                  <InputForm request={{
                    _id: "fixed3",
                    name: "password",
                    readableName: "Senha",
                    HTMLtype: "password"
                  }} handleChange={this.handleChange} error={this.getErrorByField('password')} />
                </div>
                <div className="col-md-6">
                  <InputForm request={{
                    _id: "fixed4",
                    name: "repeat_password",
                    readableName: "Repetir senha",
                    HTMLtype: "password"
                  }} handleChange={this.handleChange} error={this.getErrorByField('repeat_password')} />
                </div>
              </div>
              {this.state.fields_requests.map( request => (
                <InputForm
                  request={request}
                  key={request._id}
                  handleChange={this.handleChange}
                  error={this.getErrorByField(request.name)} />
              ))}
              <input value="Criar conta" className="btn btn-success" type="submit" />
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
        console.log(json);
        if (json.error) {
          this.setState({validation_errors: json.data});
        } else {
          this.setState({register_success: true});
        }
      });
  }
}

export default RegisterForm;
