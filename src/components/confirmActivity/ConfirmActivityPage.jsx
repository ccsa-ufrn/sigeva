import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

class ConfirmActivityPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.confirmActivity(this.props.match.params.uid, this.props.match.params.code);
  }

  render() {
      return (
        <MainLayout>
          <div className='row' >
            <div className='col-md-6'>
              <div className="card board" id="login-board">
                <div className="card-body">
                { this.props.status === 'pending_approval' &&
                  <p>Aguardando confirmação</p>
                }
                { this.props.status === 'waiting' &&
                  <p>Confirmação realizada com sucesso</p>
                }
                { this.props.status === 'error' &&
                  <p>Houve algum erro, por favor tente novamente, em caso de permanência do erro contate os administradores do sistema</p>
                }
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      );
    }
  }

export default ConfirmActivityPage;
