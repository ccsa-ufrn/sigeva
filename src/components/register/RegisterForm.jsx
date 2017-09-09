import React, { Component } from 'react';

class RegisterForm extends Component {
  render() {
    return(
      <form className="form">
        <div class="form-group">
          <label>Nome completo:</label>
          <input className="form-control" type="text" name="name" />
        </div>
      </form>
    );
  }
}

export default RegisterForm;
