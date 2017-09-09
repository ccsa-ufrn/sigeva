import React, { Component } from 'react';
import HeaderBar from '../HeaderBar';
import RegisterForm from './RegisterForm';

class RegisterPage extends Component {
  render() {
    return(
      <div>
        <HeaderBar />
        <div className="container-fluid">
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
