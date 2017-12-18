import React, { Component } from 'react';

import MainLayout from '../layout/MainLayout';
import Error404 from '../error/Error404';
import PassReset from './PassReset';


class MainPassReset extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <MainLayout>
            <PassReset />
        </MainLayout>
      );
    }
}


export default MainPassReset;
