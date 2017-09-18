import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Breadcrumb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <nav className="breadcrumb">
        {
          this.props.path.map(path => {
            if (path.active) {
              return <span key={path.address} className="breadcrumb-item active">{path.name}</span>;
            } else {
              return <a key={path.address} href={path.address} className="breadcrumb-item">{path.name}</a>;
            }
          })
        }
      </nav>
    );
  }
};

Breadcrumb.propTypes = {
  path: PropTypes.array
}
