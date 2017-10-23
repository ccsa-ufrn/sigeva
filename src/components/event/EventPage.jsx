import React, { Component } from 'react';

import MainLayout from '../layout/MainLayout';
import InscriptionBoard from './InscriptionBoard';

class EventPage extends Component {
  render() {
    return(
      <MainLayout>
        <div className='row'>
          <div className='col-md-8'>
            {/* Event datails go here */}
          </div>
          <div className='col-md-4'>
            <InscriptionBoard />
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default EventPage;
