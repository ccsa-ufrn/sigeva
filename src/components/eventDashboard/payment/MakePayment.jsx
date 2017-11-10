import React, { Component } from 'react';
import Dropzone from '../../dropzone/Dropzone';

class PaymentInstructions extends Component {
  render() {
    return (
      <div>
        <h5>Instruções para efetuar pagamento</h5><br/>
        <div dangerouslySetInnerHTML={{__html: (this.props.instructions)}}></div>
      </div>
    );
  };
}

class ReceiptSubmission extends Component {
  render() {
    return (
      <div>
        <h5>Envio de comprovante de pagamento</h5>
        <div className='row'>
          <div className='col-md-12'>
            <Dropzone fileRequirementId={this.props.fileRequirement} onSent={d => console.log}/>
          </div>
        </div>
      </div>
    );
  }
}

class MakePayment extends Component {
  render() {
    return (
    <div>
      { this.props.context.entities[0] &&
        <div>
          <PaymentInstructions instructions={this.props.context.entities[0].data.instructions} />
          <ReceiptSubmission fileRequirement={this.props.context.entities[0].data.receiptFileRequirement} />
        </div>
      }
    </div>);
  }
}

export default MakePayment;
