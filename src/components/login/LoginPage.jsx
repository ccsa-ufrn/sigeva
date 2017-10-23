import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import LoginContainer from './LoginContainer';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const layout = {
      float: 'none',
      marginLeft: 'auto',
      marginRight: 'auto',
    };

    if (this.props.logged) {
      return(<Redirect to='/dashboard' />);
    } else {
      return (
        <MainLayout>
          <div className='row' >
            <div className='col-md-4' style={layout}>
              <LoginContainer />
            </div>
          </div>
        </MainLayout>
      );
    }
  }
}

export default LoginPage;
