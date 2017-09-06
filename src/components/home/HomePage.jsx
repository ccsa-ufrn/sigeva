import React, { Component } from 'react';
import Navbar from './Navbar';
import EventsBoard from './EventsBoard';

class HomePage extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <EventsBoard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
