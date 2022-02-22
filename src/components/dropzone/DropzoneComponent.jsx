import React, { Component } from 'react';
import DefaultDropzone from 'react-dropzone';
import pdfjsLib from 'pdfjs';
import fetch from 'isomorphic-fetch';

import { application } from '../../../config'

export default class DropzoneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extensionError: false,
      numberOfPagesError: false,
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    if (acceptedFiles.length > 0) {
      var reader = new FileReader();
      reader.readAsBinaryString(acceptedFiles[0]);
      reader.onloadend = function () {
        var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
        console.log(count)
        if (count < 2) {
          this.setState({
            numberOfPagesError: true
          })
        } else {
          this.props.sendFile(formData);
        }
      }.bind(this)
          
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
          <div className='dropzone-title'>
            {this.props.fileRequirement.name}
          </div>
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
            { this.state.numberOfPagesError &&
              <div className='dropzone-error'>
                Você tem certeza que não esqueceu de colocar seu comprovante de vínculo? Caso seja profissional do turismo ou ouvinte apenas adicione uma página em branco
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
