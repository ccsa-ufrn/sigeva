import React, { Component } from 'react';

class SubmitObject extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadSubmissionEntity(this.props.entity);
  }

  render() {
    return (<div>Em desenvolvimento</div>);
  }
}

export default SubmitObject;
