import React, { Component } from 'react';
import HeaderBar from './HeaderBar';

class DashboardHeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const links = [
      {
        title: 'Sair',
        path: '',
        onclick: this.props.logout,
      },
    ];

    return (<HeaderBar links={links} />);
  }
}

export default DashboardHeaderBar;
