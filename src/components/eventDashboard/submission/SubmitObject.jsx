import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

class PaymentRequiredWarning extends Component {
  render() {
    return(
      <div className='alert alert-danger' role='alert'>
        <h5><strong>Acesso indisponível</strong></h5>
        Não é possível efetuar submissão deste tipo de objeto pois é exigida aprovação pelo
          Módulo de Pagamento. Acesse o menu <strong>Pagamento</strong> para ter mais instruções.
      </div>
    );
  }
}

class OutOfDateWarning extends Component {
  render() {
    moment.locale('pt-BR');

    let message = "Fora do período aceitável para submissões";

    if (new Date() < this.props.begin) {
      message = `Submissões deste tipo de objeto somente será permitida
      a partir de ${moment(this.props.begin).format('LL')}`;
    } else {
      message = `As submissões deste tipo de objeto não são mais aceitas desde
      ${moment(this.props.end).format('LL')}`;
    }

    return(
      <div className='alert alert-danger' role='alert'>
        <h5><strong>Acesso indisponível</strong></h5>
        {message}
      </div>
    );
  }
}

class SubmitObject extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadSubmissionEntity(this.props.entity);
  }

  render() {
    console.log(this.props.submission);
    if (this.props.submission.entity) {
      const entity = this.props.submission.entity;
      // Handle payment requirement
      if (entity.data.requirePayment === true) {
        if (this.props.payment.approved === false) {
          // Payment is required but the user did not paid
          return (<PaymentRequiredWarning/>);
        }
      }
      // Payment if required was approved or was not required
      // Check if the submission period if active
      const now = new Date();
      const submissionPeriodBegin = new Date(entity.data.submissionPeriod.begin);
      const submissionPeriodEnd = new Date(entity.data.submissionPeriod.end);

      if (submissionPeriodBegin < now && now < submissionPeriodEnd) {
        // TODO realizar a interpretação da entidade e enviar submissão
      } else {
        return (<OutOfDateWarning begin={submissionPeriodBegin} end={submissionPeriodEnd} />);
      }
    }

    return (<div>Em desenvolvimento</div>);

  }
}

export default SubmitObject;
