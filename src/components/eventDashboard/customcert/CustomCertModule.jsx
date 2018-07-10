import React, { Component } from 'react';
import CreateCertificate from './CreateCertificate';
import ListCertificates from './ListCertificates';

class CustomCertModule extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadCerts();
  }

  render() {
    return(
      <div>
        <h5><strong>Criar novo certificado</strong></h5>
        <CreateCertificate createNew={this.props.createNew} loadCerts={this.props.loadCerts} />
        <h5><strong>Lista de Certificados</strong></h5>
        <ListCertificates certs={this.props.certs} />
      </div>
    );
  }
}

export default CustomCertModule;
