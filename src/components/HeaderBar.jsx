import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderBar extends Component {
  render() {
    return(
      <nav id="nav-header" className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="/" className="navbar-brand">
          <div id="logo-sigeva" title="Sigeva"></div>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-collapsed" aria-controls="menu-collapsed" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu-collapsed">
          <ul className="navbar-nav mr-auto mt-2 mt-md-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">Criar conta</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">Acesso</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default HeaderBar;
