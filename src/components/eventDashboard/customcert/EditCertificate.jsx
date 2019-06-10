import React, { Component } from 'react';

class EditCertificate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    }

    this.changeText = this.changeText.bind(this);
  }

  changeText(e) {
    const target = e.nativeEvent.target;
    this.setState({
      text: target.value,
    });
  }

  componentDidMount() {
    if (this.props.objectToEdit.length !== 0) {
      this.setState({
        text: this.props.objectToEdit.data.text,
      });
    }
  }

    render() {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="form-title">Texto do Certificado</label>
            <input value={this.state.text} id="form-title" className="form-control" onChange={this.changeText} />
          </div>
          <div className="form-group">
            <button style={{width: '100%'}} onClick={() => this.props.editObject({ _id: this.props.objectToEdit._id, text: this.state.text})} className="btn btn-success">Salvar alterações</button>
        </div>
      </div>
    );
  }
}

export default EditCertificate;
