import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class MainHeaderBarContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserInfo();
  }

  render() {
    if (this.props.userSession.logged_user) {
      return(
        <div className='collapse navbar-collapse' id='menu-collapsed'>
          <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
            <li className='nav-item active'>
              <div className='dropdown'>
                <button type='button' className='btn btn-secondary dropdown-toggle' id='userHeaderMenu' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                  {this.props.userSession.logged_user.name}
                </button>
                <div className='dropdown-menu' aria-labelledby='userHeaderMenu'>
                  <Link to='/dashboard/account' className='dropdown-item'>Configurar conta</Link>
                  <div className='dropdown-divider'></div>
                  <a href='#' onClick={this.props.logout} className='dropdown-item'>Sair de Sigeva</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      );
    } else if (!this.props.userSession.logged_user && this.props.userSession.logged) {
      return(
        <span>Carregando menu...</span>
      );
    } else {
      return(
        <div className='collapse navbar-collapse' id='menu-collapsed'>
          <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
            <li className='nav-item active'>
              <Link to='/register' className='nav-link'>Criar conta</Link>
            </li>
            <li>
              <Link to='/login' className='nav-link'>Acesso</Link>
            </li>
          </ul>
        </div>
      );
    }
  }
}


export default MainHeaderBarContent;
