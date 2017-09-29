import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <nav id="nav-header" className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <div id="logo-sigeva" title="Sigeva"></div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-collapsed" aria-controls="menu-collapsed" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu-collapsed">
          <ul className="navbar-nav mr-auto mt-2 mt-md-0">
            {
              this.props.links.map((link) => {
                return (
                  <li className='nav-item active'>
                    <Link to={link.path} key={link.path} className='nav-link'>{link.title}</Link>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default HeaderBar;
