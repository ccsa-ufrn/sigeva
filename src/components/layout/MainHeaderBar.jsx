import React, { Component } from 'react';
import HeaderBar from './HeaderBar';

class MainHeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const links = [
      {
        title: 'Criar conta',
        path: '/register',
      },
      {
        title: 'Acesso',
        path: '/login',
      },
    ];

    return (<HeaderBar links={links} />);
  }
}

export default MainHeaderBar;
