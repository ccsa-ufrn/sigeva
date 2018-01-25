import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import EventDashLayout from '../layout/EventDashLayout';
import EventDashboardMenu, { EventDashboardMenuItem } from './EventDashboardMenu';
import Error404 from '../error/Error404';
import PaymentModule from './payment/PaymentModule';
import ThematicGroupsModule from './thematicgroups/ThematicGroupsModule';
import EventDashboardHome from './EventDashboardHome';

class EventDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: props.match.params.module,
      entity: props.match.params.entity,
    };

    this.userContainsEvent = this.userContainsEvent.bind(this);
    this.generateMenu = this.generateMenu.bind(this);
    this.generateModule = this.generateModule.bind(this);
    this.getModuleContext = this.getModuleContext.bind(this);
  }

  userContainsEvent() {
    if (this.props.userSession.logged_user) {
      const event = this.props.userSession.logged_user.ofEvents.find((event) => {
        return event._id == this.props.match.params.id;
      });
      return event !== undefined;
    }
  }

  getModuleContext(moduleSlug) {
    const moduleContext = this.props.event.context.find(mod => mod.slug === moduleSlug);
    return moduleContext;
  }

  generateMenu() {
    const prefix = `/event/${this.props.event.id}/dashboard`;
    return (
      <EventDashboardMenu event={this.props.event} roles={this.props.event.relationship}>
        <EventDashboardMenuItem
          module={{name:'Início', slug:null}}
          entity={{name: null, slug:null}}
          baseUrl={prefix}
          active={this.state.module == null ? 'active' : ''}
           />
        { this.props.event.context ?
          this.props.event.context.map((mod)=> {
            if (mod.slug == 'payment' || mod.slug == 'thematicgroups') {
              return <EventDashboardMenuItem
                key={mod.slug}
                module={{name: mod.name, slug: mod.slug}}
                baseUrl={prefix}
                active={this.state.module == mod.slug ? 'active' : ''}
                />
            } else {
              return mod.entities.map((entity) => {
                return <EventDashboardMenuItem
                  key ={`${mod.slug}${entity.slug}`}
                  module={{name: mod.name, slug: mod.slug}}
                  entity={{name: entity.name, slug: entity.slug}}
                  baseUrl={prefix}
                  active={this.state.module == mod.slug &&
                          this.state.entity == entity.slug ? 'active' : ''}
                  />
              });
            }
          })
          : <span>Carregando contexto...</span>
        }

      </EventDashboardMenu>
    );
  }

  generateModule() {
    if (!this.props.event.context && this.state.module)
      return <Redirect to={`/`} />;

    switch(this.state.module) {
      case 'payment':
        return <PaymentModule paymentContext={this.getModuleContext('payment')} />
      case 'thematicgroups':
        return <ThematicGroupsModule />
      default:
        return <EventDashboardHome
          event={this.props.event}
          roles={this.props.event.relationship}
          payment={this.props.payment} />
    }
  }

  componentDidMount() {
    this.props.loadUserIfNeed();
    this.props.loadEventIfNeed(this.props.match.params.id);
    this.props.loadRelationship(this.props.match.params.id);
    this.props.loadContext(this.props.match.params.id);
    this.props.loadPaymentInfo(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        module: nextProps.match.params.module,
        entity: nextProps.match.params.entity,
      });
  }

  render() {
    if (this.props.event.not_found) {
      return (<Error404/>);
    }
    if (!this.props.userSession.logged || !this.userContainsEvent()) {
      return (<Redirect to='/' />);
    }

    return (
      <EventDashLayout>
        <div className='row'>
          <div className='col-md-3 event-dashboard-top-padding'>
            { this.generateMenu() }
          </div>
          <div className='col-md-9 event-dashboard-top-padding'>
            { this.generateModule() }
          </div>
        </div>
      </EventDashLayout>
    );
  }
}

export default EventDashboardPage;
