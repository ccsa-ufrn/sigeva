import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
              return <Link key={path.address} to={path.address} className="breadcrumb-item">{path.name}</Link>;
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
