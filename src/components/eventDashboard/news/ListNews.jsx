import React, { Component } from 'react';

class NewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'exibition',
      title: this.props.title,
      text: this.props.text,
    }

    this.changeMode = this.changeMode.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.updateNew = this.updateNew.bind(this);
  }

  changeMode(mode) {
    if (this.state.mode == 'exibition') {
      this.setState({
        mode: 'edition',
      });
    } else {
      this.setState({
        mode: 'exibition',
      });
    }
  }

  changeTitle(e) {
    const target = e.nativeEvent.target;
    this.setState({
      title: target.value,
    });
  }

  changeText(e) {
    const target = e.nativeEvent.target;
    this.setState({
      text: target.value,
    });
  }

  updateNew() {
    this.props.updateNew(this.props.newId, this.state.title, this.state.text);
    this.setState({
      mode: 'exibition',
    });
  }

  render() {
    if (this.state.mode === 'exibition') {
      return (
        <tr>
          <td>
            {this.props.title}
            <div className="collapse" id={`new${this.props.newId}`}>
              <div className="card card-body">
                {this.props.text}
              </div>
            </div>
          </td>
          <td>
            <a
              data-toggle="collapse"
              href={`#new${this.props.newId}`}
              role="button"
              aria-expanded="false"
              aria-controls={`new${this.props.newId}`}
            >expandir</a>{' '}
            <a href="#" onClick={this.changeMode}>editar</a>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='form-group'>
                  <label>Título da notícia: </label>
                  <input type='text' className='form-control' defaultValue={this.state.title} onChange={this.changeTitle} />
                </div>
                <div className='form-group'>
                  <label>Conteúdo da notícia:</label>
                  <textarea className='form-control' defaultValue={this.state.text} onChange={this.changeText}></textarea>
                </div>
                <div className='form-group'>
                  <button className='btn btn-success' onClick={this.updateNew}>Atualizar notícia</button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    }
  }
}

class ListNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className='table'>
        <tbody>
          { this.props.news !== null &&
            this.props.news.map((newItem) => {
              return (
                <NewItem
                  key={newItem._id}
                  newId={newItem._id}
                  title={newItem.data.title}
                  text={newItem.data.text}
                  updateNew={this.props.updateNew}
                  />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default ListNews;
