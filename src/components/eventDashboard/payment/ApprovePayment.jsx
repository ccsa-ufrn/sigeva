import React, { Component } from 'react';

import { application } from '../../../../config';

class ReceiptsTable extends Component {
  render() {
    return (
      <div>
        <h5><strong>Pagamentos para aprovação</strong></h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Papel do usuário</th>
              <th>Comprovante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            { this.props.payments !== null &&
              this.props.payments.map((payment) => {
                return (
                  <tr key={payment._id}>
                    <td>{payment.data.user.name}</td>
                    <td>{payment.roles.map(role => role.name)}</td>
                    <td>
                      <a href={`/file/download/${payment.data.file._id}`} target='_blank'>
                        {payment._id}
                      </a>
                    </td>
                    <td>
                      <a href='' className='btn btn-outline-success btn-sm'>Aprovar pagamento</a>{' '}
                      <a href='' className='btn btn-outline-danger btn-sm'>Rejeitar pagamento</a>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class ApprovePayment extends Component {
  componentDidMount() {
    this.props.loadToApprovePayments();
  }

  render() {
    console.log(this.props);
    return (
      <div>
      { this.props.approvePayment.to_approve_payments &&
        <ReceiptsTable payments={this.props.approvePayment.to_approve_payments} />
      }
      </div>
    );
  }
}

export default ApprovePayment;
