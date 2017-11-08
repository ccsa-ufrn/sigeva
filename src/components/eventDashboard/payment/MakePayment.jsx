import React, { Component } from 'react';

class PaymentInstructions extends Component {
  render() {
    return (
      <div>
        <h5>Instruções para efetuar pagamento</h5><br/>
        <div dangerouslySetInnerHTML={{__html: (this.props.instructions)}}></div>
      </div>
    )
  };
}

class MakePayment extends Component {
  render() {
    return (
    <div>
      { this.props.context.entities[0] &&
        <PaymentInstructions instructions={this.props.context.entities[0].data.instructions} />
      }
    </div>);
  }
}

export default MakePayment;
