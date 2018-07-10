import React, { Component } from 'react';

class CreateCertificate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this._changeContent = this._changeContent.bind(this);
    this._createNew = this._createNew.bind(this);
  }

  _changeContent(event) {
    const target = event.nativeEvent.target;
    this.setState({ text: target.value });
  }

  _createNew() {
    this.props.createNew(this.state.text);
    this.props.loadCerts();
    this.setState({ text: '' });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='form-group'>
            <label>Conteúdo do certificado:</label>
            <textarea className='form-control' value={this.state.text} onChange={this._changeContent} ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-success' onClick={this._createNew}>Cadastrar novo certificado</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCertificate;
