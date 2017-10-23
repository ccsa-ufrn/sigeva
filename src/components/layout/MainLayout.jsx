import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Breadcrumb from '../Breadcrumb';
import MainHeaderBar from './MainHeaderBar';

class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <MainHeaderBar />
        { this.props.path &&
          <Breadcrumb path={ this.props.path } />
        }
        <div className='container-fluid'>
          { this.props.children }
        </div>
        {/* Footer bar */}
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
  path: PropTypes.array,
}

export default MainLayout;
