import React, { Component } from 'react';

class CertItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>
          <div className="card card-body">
            {this.props.text}
          </div>
        </td>
        <td>
          <a href={`/certificado/${this.props.code}`} target="_blank">Ver certificado</a>
        </td>
        <td>
          <a className="btn" onClick={() => this.props.setObjectToEdit(this.props.certItem)}>Editar Certificado</a>
        </td>
      </tr>
    );
  }
}

class ListCertificates extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className='table'>
        <tbody>
          { this.props.certs !== null &&
            this.props.certs.map((certItem) => {
              return (
                <CertItem
                  setObjectToEdit={this.props.setObjectToEdit}
                  key={certItem._id}
                  certItem={certItem}
                  text={certItem.data.text}
                  code={certItem.data.code}
                  />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default ListCertificates;
