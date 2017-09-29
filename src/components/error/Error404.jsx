import React, { Component } from 'react';
import MainLayout from '../layout/MainLayout';

class Error404 extends Component {
  render() {
    const page = (
      <div id='error404' className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div id='error-text'>
              <h3>404. Página não encontrada</h3>
              <p>Desculpa, mas a página que você está procurando não foi encontrada. Verifique a URL e tente novamente.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (<MainLayout children={page} />);
  }
}

export default Error404;
