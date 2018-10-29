import React, { Component } from 'react';

import { application } from '../../../../config';

class ReceiptsTable extends Component {
  constructor() {
    super();
    this.state = {
      statusDesired : 'to_approve'
    }
    this.approvePayment = this.approvePayment.bind(this);
    this.rejectPayment = this.rejectPayment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({statusDesired: event.target.value});
  }

  render() {
    const style = {
      textTransform: 'capitalize'
    };
    const filtered = this.props.payments.filter(status => status.data.status == this.state.statusDesired)
    return (
      <div>
        <h5><strong>Pagamentos para aprovação</strong></h5>
        <div>
          <h6>Status do pagamento</h6>
          <select className="form-control" value={this.state.statusDesired} onChange={this.handleChange}>
            <option value='to_approve'>A aprovar</option>
            <option value='approved'>Aprovado</option>
            <option value='rejected'>Rejeitado</option>
          </select>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Comprovante</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.payments !== null &&
              filtered.map((payment) => {
                return (
                  <tr key={payment._id}>
                    <td><p style={style}>{payment.data.user.name}{' '}
                      { payment.data.user.ofFields.map((field) => {
                        if (field.request.name == "cpf") {
                          return (<span key='cpf'>( CPF: {field.value} )</span>);
                        }
                      }) }
                    </p></td>
                    <td>
                    { payment.data.file &&
                      <a href={`/file/download/${payment.data.file._id}`} target='_blank'>
                        {payment._id}
                      </a>
                    }
                    </td>
                    { payment.data.status === 'to_approve' &&
                      <td>
                        <button onClick={() => this.approvePayment(payment._id)} className='btn btn-outline-success btn-sm'>Aprovar pagamento</button>{' '}
                        <button onClick={() => this.rejectPayment(payment._id)} className='btn btn-outline-danger btn-sm'>Rejeitar pagamento</button>
                      </td>
                    }
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
