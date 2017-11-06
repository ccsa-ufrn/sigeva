import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventDashHeaderBar from './EventDashHeaderBar';
import FooterBar from './FooterBar';

class EventDashLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <EventDashHeaderBar />
        <div className='container-fluid'>
          { this.props.children }
        </div>
        <FooterBar/>
      </div>
    );
  }
}

EventDashLayout.propTypes = {
  children: PropTypes.any.isRequired,
  path: PropTypes.array,
}

export default EventDashLayout;
