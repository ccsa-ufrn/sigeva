import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class EventDashHeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <nav className="navbar navbar-dark " style={{ backgroundColor:'#FF404E' }}>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to='/' className="nav-link"><i className="fa fa-caret-left" aria-hidden="true"></i> Voltar ao Sigeva</Link>
          </li>
        </ul>
        <span className="form-inline">
          <a href="#" style={{color:'#fff'}}>{this.props.userSession.logged_user.name}</a>
        </span>
      </nav>
    );
  }
}

export default EventDashHeaderBar;
