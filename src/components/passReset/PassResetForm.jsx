import React, { Component } from 'react';

import MainLayout from '../layout/MainLayout';
import Error404 from '../error/Error404';
import Form from './Form'



class PassResetForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <MainLayout>
          <Form />
        </MainLayout>
      );
    }
}
export default PassResetForm;
