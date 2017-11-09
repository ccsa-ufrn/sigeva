import React, { Component } from 'react';
import DropzoneComponent from './DropzoneComponent';
import { sendFile, loadRequirement } from '../../actions/dropzone';

class Dropzone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileRequirement: null,
      file: null,
      fail: false,
    };
  }

  componentDidMount() {
    loadRequirement(this.props.fileRequirementId)
      .then((json) => {
        console.log(json);
        if (!json.error) {
          this.setState({
            fileRequirement: json.data,
          });
        } else {
          this.setState({
            fail: true,
          })
        }
      });
  }

  doSendFile(formData) {
    if (this.state.fileRequirement) {
      sendFile(formData, this.state.fileRequirement._id)
        .then((json) => {
          console.log(json);
          if (!json.error) {
            this.setState({
              file: json.data,
            });

            this.props.onSent(json.data);
          } else {
            this.setState({
              fail: true,
            });

            this.props.onSent(false);
          }
        });
    }
  }


  render() {
    return (
      <DropzoneComponent
        sendFile={this.doSendFile.bind(this)}
        fileRequirement={this.state.fileRequirement}
        file={this.state.file}
        fail={this.state.fail}
      />
    );
  }
}

export default Dropzone;
