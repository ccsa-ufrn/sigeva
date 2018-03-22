import React, { Component } from 'react';
import SubmitObjectContainer from './SubmitObjectContainer';
import SeeToApproveSubmissionsContainer from './SeeToApproveSubmissionsContainer';
import SeeObjectsContainer from './SeeObjectsContainer';
import SeeAllObjectsContainer from './SeeAllObjectsContainer';

class SubmissionModule extends Component {
  constructor(props) {
    super(props);

    const entity = this.props.submissionContext.entities.filter(el => el.slug == this.props.entity)[0];
    const permissions = this.props.submissionContext.permissions.filter(perm => perm.entity == entity._id);
    this.state = {
      permissions: permissions,
      initialAction: null,
    };


    // if (this.props.submissionContext.permissions.length > 0) {
    if (this.state.permissions.length > 0) {
      this.state.initialAction = this.state.permissions[0].action;
    }
  }

  loadPermissionTab(action) {
    switch(action) {
      case 'submit_object':
        return <SubmitObjectContainer entity={this.props.entity} />;
      case 'see_objects':
        return <SeeObjectsContainer entity={this.props.entity} />;
      case 'see_all_objects':
        return <SeeAllObjectsContainer entity={this.props.entity} />;
      default:
        return null;
    }
  }

  componentWillReceiveProps(nextProps) {
    const entity = nextProps.submissionContext.entities.filter(el => el.slug == nextProps.entity)[0];
    const permissions = nextProps.submissionContext.permissions.filter(perm => perm.entity == entity._id);
    if (permissions.length > 0) {
      this.setState({
        initialAction: permissions[0].action
      });
    }
    this.setState({
      permissions: permissions
    });

    if (nextProps.entity !== this.props.entity) {
      this.props.loadSubmissionEntity(nextProps.entity);
    }
  }

  componentDidMount() {
    this.props.loadSubmissionEntity(this.props.entity);
    this.props.loadObjectsToEvaluate(this.props.entity);
  }

  render() {
    return(
      <div className='event-dashboard-module'>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          {
            this.state.permissions.map((perm) => {
              return (
                <li key={perm.action} className='nav-item'>
                  <a className={`nav-link ${this.state.initialAction == perm.action ? 'active': ''}`} id={`payment-${perm.action}-pill`} data-toggle='pill' href={`#paymet-${perm.action}-tab`} role="tab" aria-controls={`payment-${perm.action}`} aria-selected='true'>{perm.name}</a>
                </li>
              );
            })
          }
          {
            this.props.submission.objectsToEvaluate.thematicGroups &&
            this.props.submission.objectsToEvaluate.thematicGroups.length !== 0 &&
            <li className="nav-item">
              <a className={`nav-link ${this.state.initialAction == 'evaluate' ? 'active': ''}`} id={`${this.props.entity}-evaluation-pill`} data-toggle='pill' href={`#${this.props.entity}-evaluation-tab`} role="tab" aria-controls={`${this.props.entity}-evaluation`} aria-selected='true'>Avaliar trabalhos</a>
            </li>
          }
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {
            this.state.permissions.map((perm) => {
              return (
                <div key={perm.action} className={`tab-pane fade ${this.state.initialAction == perm.action ? 'show active': ''}`} id={`paymet-${perm.action}-tab`} role="tabpanel" aria-labelledby={`paymet-${perm.action}-pill`}>
                  { this.loadPermissionTab(perm.action) }
                </div>
              );
            })
          }
          {
            this.props.submission.objectsToEvaluate.thematicGroups &&
            this.props.submission.objectsToEvaluate.thematicGroups.length !== 0 &&
            <div className={`tab-pane fade ${this.state.initialAction == 'evaluate' ? 'show active': ''}`} id={`${this.props.entity}-evaluation-tab`} role="tabpanel" aria-labelledby={`${this.props.entity}-evaluation-pill`}>
              <SeeToApproveSubmissionsContainer entity={this.props.entity}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SubmissionModule;
