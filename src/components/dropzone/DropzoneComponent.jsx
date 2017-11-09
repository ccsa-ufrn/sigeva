import React, { Component } from 'react';
import DefaultDropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';

export default class DropzoneComponent extends Component {
  onDrop(acceptedFiles, rejectedFiles) {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      console.log(file);
      formData.append('file', file);
    });

    this.props.sendFile(formData);
  }

  render() {
    console.log(this.props);
    if (this.props.fail) {
      return (<div>Error</div>);
    } else if (!this.props.fileRequirement) {
      return (<span>Loading...</span>);
    } else {
      return (
        <div>
          <DefaultDropzone onDrop={this.onDrop.bind(this)} accept={this.props.fileRequirement.acceptedExtensions}>
            <p>
              {this.props.fileRequirement.name}
              {this.props.fileRequirement.description}
              {this.props.fileRequirement.acceptedExtensions}
            </p>
          </DefaultDropzone>
        </div>
      );
    }
  }
}
