import React, { Component } from 'react';
import Dropzone from '../../dropzone/Dropzone';

import { application } from '../../../../config';

class PaymentInstructions extends Component {
  render() {
    return (
      <div>
        <h5><strong>Instruções para efetuar pagamento</strong></h5><br/>
        <h2><strong style="text-color: red;">ATENÇÃO: </strong> As inscrições em atividades vão até amanhã dia 22 de Setembro, após isso, os alunos podem participar das atividades no dia, DESDE QUE hajam vagas, haverá uma lista para colocar suas informações, se o aluno tiver com a situação de pagamento regularizada(isento ou com pagamento aprovad0), nós conseguimos incluir o certificado após o evento sem maiores problemas</h2>
        <p dangerouslySetInnerHTML={{__html: (this.props.instructions)}}></p>
      </div>
    );
  };
}

class ReceiptsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.receipts.map((receipt) => {
              if (receipt.data.type === 'receipt') {
                return (
                  <li key={receipt._id}>
                    O comprovante <a href={`${application.url}/file/download/${receipt.data.file}`} target='_blank'>{receipt._id}</a>
                    {receipt.data.status == 'approved' &&
                      <span> foi <span className='badge badge-success'>Aprovado</span></span>
                    }
                    {receipt.data.status == 'rejected' &&
                      <span> foi <span className='badge badge-danger'>Rejeitado</span></span>
                    }
                    {receipt.data.status == 'to_approve' &&
                      <span> está <span className='badge badge-warning'>Aguardando avaliação</span></span>
                    }
                  </li>
                );
              } else if (receipt.data.type === 'free') {
                return (
                  <li key={receipt._id}>
                    O usuário está <span className='badge badge-success'>isento</span> de efetuar pagamento
                  </li>
                );
              }
            })
          }
        </ul>
      </div>
    );
  }
}

class ReceiptSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      submit_status: null,
    }
  }

  sendReceipt() {
    if (this.state.file !== null) {
      this.setState({ submit_status: 'Enviando...' });
      this.props.submitReceipt(this.state.file._id);
      this.setState({file: null, submit_status: 'Comprovante enviado!'});
    }
  }

  render() {
    return (
      <div>
        <h5><strong>Situação do pagamento da inscrição</strong></h5>
        <div className='row'>
          <div className='col-md-12'>
            { !this.props.payment.approved &&
              <div>
                <p>Você não possui pagamento aprovado neste evento. Por favor, siga as <strong>instruções de pagamento</strong> e envie o
                comprovante através do formulário abaixo.</p>
                <Dropzone fileRequirementId={this.props.fileRequirement} onSent={file => this.setState({file})}/><br/>
                { this.state.file &&
                  <button className='btn btn-primary' onClick={this.sendReceipt.bind(this)}>Enviar comprovante</button>
                }
              </div>
            }
            { this.state.submit_status &&
              <div>
                { this.state.submit_status }
              </div>
            }
            { this.props.payment.receipts.length !== 0 &&
              <div>
                <ReceiptsList receipts={this.props.payment.receipts} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

class MakePayment extends Component {
  componentDidMount() {
    this.props.reloadPaymentInfo();
  }

  render() {
    return (
    <div>
      { this.props.context.entities[0] &&
        <div>
          <PaymentInstructions instructions={this.props.context.entities[0].data.instructions} />
          <ReceiptSubmission
            payment={this.props.payment}
            submitReceipt={this.props.submitReceipt}
            fileRequirement={this.props.context.entities[0].data.receiptFileRequirement} />
        </div>
      }
    </div>);
  }
}

export default MakePayment;
