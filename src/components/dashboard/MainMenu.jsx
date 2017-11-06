import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainMenuEdge extends Component {
  render() {
    return(
      <div className='card board' id='dashboard-side-menu'>
        <div className='card-header'>
          Meus eventos
        </div>
        <div className='card-body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class MainMenu extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    if (this.props.userSession.logged_user) {
      if(this.props.userSession.logged_user.ofEvents && this.props.userSession.logged_user.ofEvents.length > 0) {
        return (
          <MainMenuEdge>
            <ul className='nav flex-column'>
              {
                this.props.userSession.logged_user.ofEvents.map((event) => {
                  return (
                    <li className='nav-item'>
                      <Link className='nav-link' to={`/event/${event._id}/dashboard`}>{event.name}</Link>
                    </li>
                  );
                })
              }
            </ul>
          </MainMenuEdge>
        );
      } else {
        return (
          <MainMenuEdge>
            <span>Nenhum evento a ser exibido</span>
          </MainMenuEdge>
        )
      }
    } else {
      return (<div></div>);
    }
  }
}

export default MainMenu;
