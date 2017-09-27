import React, { Component } from 'react';
import MainLayout from '../layout/MainLayout';

class Error404 extends Component {
  render() {
    const page = (
      <div><h2>Error 404</h2></div>
    );

    const error404Path = [
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

    return (<MainLayout children={page} />);
  }
}

export default Error404;
