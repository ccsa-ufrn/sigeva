import React, { Component } from 'react';

class MainMenu extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className='card board' id='dashboard-side-menu'>
        <div className='card-header'>
          Meus eventos
        </div>
        <div className='card-body'>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <a href='#' className='nav-link'>Link para um evento</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MainMenu;
