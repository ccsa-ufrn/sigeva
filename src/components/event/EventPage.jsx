import React, { Component } from 'react';

import MainLayout from '../layout/MainLayout';
import InscriptionBoardContainer from './InscriptionBoardContainer';

class EventPage extends Component {
  render() {
    return(
      <MainLayout>
        <div className='row'>
          <div className='col-md-8'>
            {/* Event datails go here */}
          </div>
          <div className='col-md-4'>
            <InscriptionBoardContainer />
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default EventPage;
