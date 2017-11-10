import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';

export default class DropzoneTest extends Component {
  onDrop(acceptedFiles, rejectedFiles) {
    const requirementId = this.props.match.params.id;
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      console.log(file);
      formData.append('file', file);
    });

    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    };

    fetch(`http://localhost:3000/api/dropzone/${requirementId}`, config)
      .then(resp => resp.json())
      .then(console.log);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Inserts your file here</p>
        </Dropzone>
      </div>
    );
  }
}
