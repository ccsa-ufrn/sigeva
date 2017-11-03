import React, { Component } from 'react';

import MainLayout from '../layout/MainLayout';
import Error404 from '../error/Error404';
import InscriptionBoardContainer from './InscriptionBoardContainer';

class EventPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadEventIfNeed(this.props.match.params.id);
    this.props.loadEventRoles(this.props.match.params.id);
    if (this.props.userSession.logged) {
      this.props.loadRelationship(this.props.match.params.id);
    }
  }

  render() {
    if (this.props.event.not_found) {
      return (<Error404/>);
    } else {
      const path = [
        {
          active: false,
          name: 'Início',
          address: '/',
        },
        {
          active: true,
          name: this.props.event.name,
          address: `/event/${this.props.event.id}`,
        },
      ];
      return(
        <MainLayout path={path}>
          <div className='row'>
            <div className='col-md-8'>
              {/* event details goes here */}
            </div>
            <div className='col-md-4'>
              <InscriptionBoardContainer />
            </div>
          </div>
        </MainLayout>
      );
    }
  }
}

export default EventPage;
