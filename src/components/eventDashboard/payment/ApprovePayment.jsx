import React, { Component } from 'react';

import { application } from '../../../../config';

class ReceiptsTable extends Component {
  constructor() {
    super();
    this.approvePayment = this.approvePayment.bind(this);
    this.rejectPayment = this.rejectPayment.bind(this);
  }

  render() {
    const style = {
      textTransform: 'capitalize'
    };

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
                    <td><p style={style}>{payment.data.user.name}{' '}
                      { payment.data.user.ofFields.map((field) => {
                        if (field.request.name == "cpf") {
                          return (<span key='cpf'>( CPF: {field.value} )</span>);
                        }
                      }) }
                    </p></td>
                    { payment.roles &&
                      <td>{payment.roles.roles.map(role => role.name)}</td>
                    }
                    <td>
                      <a href={`/file/download/${payment.data.file._id}`} target='_blank'>
                        {payment._id}
                      </a>
                    </td>
                    <td>
                      <button onClick={() => this.approvePayment(payment._id)} className='btn btn-outline-success btn-sm'>Aprovar pagamento</button>{' '}
                      <button onClick={() => this.rejectPayment(payment._id)} className='btn btn-outline-danger btn-sm'>Rejeitar pagamento</button>
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

  approvePayment(receiptId) {
    this.props.updateStatus(receiptId, 'approved');
  }

  rejectPayment(receiptId) {
    this.props.updateStatus(receiptId, 'rejected');
  }
}

class ApprovePayment extends Component {
  componentDidMount() {
    this.props.loadToApprovePayments();
  }

  render() {
    return (
      <div>
      { this.props.approvePayment.to_approve_payments &&
        <ReceiptsTable payments={this.props.approvePayment.to_approve_payments} updateStatus={this.props.updateReceiptStatus} />
      }
      </div>
    );
  }
}

export default ApprovePayment;
