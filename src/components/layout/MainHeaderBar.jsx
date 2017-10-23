import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MainHeaderBarContentContainer from './MainHeaderBarContentContainer';

class MainHeaderBar extends Component {
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
        <MainHeaderBarContentContainer />
      </nav>
    );
  }
}

export default MainHeaderBar;
