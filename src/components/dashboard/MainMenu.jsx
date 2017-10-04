import React, { Component } from 'react';

class MainMenu extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="card board" id="login-board">
        <div className="card-header">
          Maradona Morais
        </div>
        <div className="card-body">
          Menu aqui
        </div>
      </div>
    );
  }
}

export default MainMenu;
