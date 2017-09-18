import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FooterBar from '../FooterBar';
import HeaderBar from '../HeaderBar';
import Breadcrumb from '../Breadcrumb';

export default class MainLayout extends Component {
  constructor(props) {
    console.log(props.path);
    super(props);
  }

  render() {
    return(
      <div>
        <HeaderBar />
        <Breadcrumb path={ this.props.path } />
        <div className="container-fluid">
          { this.props.children }
        </div>
        <FooterBar />
      </div>
    );
  };
}

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
  path: PropTypes.array.isRequired
}
