import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import RegisterForm from './RegisterForm';

class RegisterPage extends Component {
  constructor(props) {
    console.log('RegisterPage: ', props);
    super(props);
  }

  componentDidMount() {
    this.props.fetchRegisterFields();
  }

  render() {
    const registerPath = [
      {
        active: false,
        name: 'Início',
        address: '/',
      },
      {
        active: true,
        name: 'Registro',
        address: '/register',
      },
    ];
    return(
      <MainLayout children={<RegisterForm register={this.props} />} path={registerPath} />
    );
  }
}

RegisterPage.propTypes = {
  fields: PropTypes.array,
  createField: PropTypes.func.isRequired,
  fetchRegisterFields: PropTypes.func.isRequired,
}

export default RegisterPage;
