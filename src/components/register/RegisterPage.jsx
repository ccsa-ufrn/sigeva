import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HeaderBar from '../HeaderBar';
import FooterBar from '../FooterBar';
import RegisterForm from './RegisterForm';

class RegisterPage extends Component {
  render() {
    return(
      <div>
        <HeaderBar />
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Início</Link>
          <span className="breadcrumb-item active">Registro</span>
        </nav>
        <div className="container-fluid">
          <RegisterForm />
        </div>
        <FooterBar />
      </div>
    );
  }
}

export default RegisterPage;
