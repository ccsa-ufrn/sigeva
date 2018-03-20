import React, { Component } from 'react';
import CreateNew from './CreateNew';
import ListNews from './ListNews';

class NewsModule extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadNews();
  }

  render() {
    return(
      <div>
        <h5><strong>Escrever nova notícia</strong></h5>
        <CreateNew createNew={this.props.createNew} loadNews={this.props.loadNews} />
        <h5><strong>Lista de Notícias</strong></h5>
        <ListNews news={this.props.news} updateNew={this.props.updateNew} />
      </div>
    );
  }
}

export default NewsModule;
