import React, { Component } from 'react';

class CreateNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };

    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.sendNew = this.sendNew.bind(this);
  }

  changeTitle(event) {
    const target = event.nativeEvent.target;
    this.setState({ title: target.value });
  }

  changeContent(event) {
    const target = event.nativeEvent.target;
    this.setState({ content: target.value });
  }

  sendNew() {
    this.props.createNew(this.state.title, this.state.content);
    this.props.loadNews();
    this.setState({ title: '', content: ''});
  }

  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='form-group'>
            <label>Título da notícia: </label>
            <input type='text' className='form-control' value={this.state.title} onChange={this.changeTitle} />
          </div>
          <div className='form-group'>
            <label>Conteúdo da notícia:</label>
            <textarea className='form-control' value={this.state.content} onChange={this.changeContent} ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-success' onClick={this.sendNew}>Cadastrar nova notícia</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNew;
