import React, { Component } from 'react';

class InputForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div key={this.props.request._id} className="form-group">
        <label htmlFor={this.props.request._id}>{this.props.request.readableName}</label>
        { this.props.request.HTMLtype == 'textarea' ?
          <textarea className="form-control" id={this.props.request._id} name={this.props.request.name} onChange={this.props.handleChange}></textarea>
        :
          <input className="form-control" type={this.props.request.HTMLtype} id={this.props.request._id} name={this.props.request.name} onChange={this.props.handleChange} />
        }
        { this.props.error !== null &&
          <div className="form-error-message">
            { this.props.error.message }
          </div>
        }
      </div>
    );
  }
}

export default InputForm;
