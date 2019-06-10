import React, { Component } from 'react';
import CreateCertificate from './CreateCertificate';
import ListCertificates from './ListCertificates';
import EditCertificate from './EditCertificate';

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
        { this.props.objectToEdit.length === 0 &&
          <div>
            <h5><strong>Lista de Certificados</strong></h5>
            <ListCertificates certs={this.props.certs} setObjectToEdit={this.props.setObjectToEdit} />
          </div>
        }
        { this.props.objectToEdit.length !== 0 && 
          <div>
            <h5><strong>Editar Certificado</strong>{' '}<button className='btn btn-warning' onClick={() => this.props.setObjectToEdit([])}>Voltar</button></h5>
            <EditCertificate objectToEdit={this.props.objectToEdit} editObject={this.props.editObject} /> 
          </div>
        }
      </div>
    );
  }
}

export default CustomCertModule;
