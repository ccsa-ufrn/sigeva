import React, { Component } from 'react';
import UserPicker from '../../userPicker/userPicker';
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

class SubmissionPane extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5><strong>Submissão do tipo "{this.props.entity.name}"</strong></h5>
        <p>{this.props.entity.data.description}</p>
        <div className="form-group">
          <label>Título do trabalho</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label>Grupo temático</label>
          <select className="form-control">
            { this.props.thematicGroups &&
              this.props.thematicGroups.map((tg) => {
                return (<option key={tg.data._id} value={tg.data._id}>{tg.data.name}</option>);
              })
            }
          </select><br/>
          <UserPicker type="artigo" eventId="5a70ca268f5fc344c2cac32d"/>
        </div>
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
    this.props.loadThematicGroups();
  }

  render() {
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
        return (<SubmissionPane entity={this.props.submission.entity} thematicGroups={this.props.thematicGroups} />);
      } else {
        return (<OutOfDateWarning begin={submissionPeriodBegin} end={submissionPeriodEnd} />);
      }

      return (<SubmissionPane entity={this.props.submission.entity} thematicGroups={this.props.thematicGroups} />);
    }

    return (<div>Carregando...</div>);

  }
}

export default SubmitObject;
