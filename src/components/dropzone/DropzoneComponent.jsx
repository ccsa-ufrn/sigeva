import React, { Component } from 'react';
import DefaultDropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';

import { application } from '../../../config'

export default class DropzoneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extensionError: false,
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    if (acceptedFiles.length > 0) {
      this.props.sendFile(formData);
    } else {
      this.setState({
        extensionError: true,
      });
    }
  }

  formatExtensions(extensions) {
    const splitedExtensions = extensions.split(',');
    let formatedExtensions = '';
    splitedExtensions.forEach((ext) => {
      formatedExtensions = formatedExtensions.concat(` ${ext}`);
    });
    return formatedExtensions;
  }

  render() {
    if (this.props.fail) {
      if (!this.props.fileRequirement) {
        return (
          <div className='dropzone'>
            <div className='dropzone-error'>
              Erro ao buscar requisição de arquivo
            </div>
          </div>
        );
      } else {
        return (
          <div className='dropzone'>
            <div className='dropzone-error'>
              Erro ao submeter arquivo
            </div>
          </div>
        );
      }
    } else if (this.props.sending) {
      return(
        <div className='dropzone'>
          <div className='dropzone-sending'>
            Aguarde... O arquivo está sendo enviado
          </div>
        </div>
      );
    } else if (!this.props.fileRequirement) {
      return (<span>Loading...</span>);
    } else if (this.props.file) {
      return (
        <div className='dropzone'>
          <div className='dropzone-file'>
            <a target='_blank' href={`${application.url}/file/download/${this.props.file._id}`}>
              { `${this.props.file._id}.${this.props.file.extension}` }
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <DefaultDropzone className='dropzone' activeClassName='active' onDrop={this.onDrop.bind(this)} accept={this.props.fileRequirement.acceptedExtensions}>
            <div className='dropzone-title'>
              {this.props.fileRequirement.name}
            </div>
            <div className='dropzone-header'>
              <div className='dropzone-icon-box'>
                <div className='dropzone-icon'></div>
              </div>
              Arraste e solte o arquivo ou <span className='btn btn-primary'>importe o arquivo</span>
            </div>
            { this.state.extensionError &&
              <div className='dropzone-error'>
                A extensão do arquivo inserido é incompatível com as extensões aceitáveis
              </div>
            }
            <div className='dropzone-description'>
              Extensões aceitáveis: {this.formatExtensions(this.props.fileRequirement.acceptedExtensions)}
            </div>
          </DefaultDropzone>
        </div>
      );
    }
  }
}
