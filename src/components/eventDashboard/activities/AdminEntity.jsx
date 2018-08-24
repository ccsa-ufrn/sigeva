import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AdminEntityPane extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name : '',
      startProposalPeriod: moment(), 
      endProposalPeriod: moment(), 
      startEnrollmentPeriod: moment(), 
      endEnrollmentPeriod: moment(), 
      maxProposersUsers: 4,
      requirePayment: false,
    };

    this.changeName = this.changeName.bind(this);
    this.changeStartProposalPeriod = this.changeStartProposalPeriod.bind(this);
    this.changeEndProposalPeriod = this.changeEndProposalPeriod.bind(this);
    this.changeStartEnrollmentPeriod = this.changeStartEnrollmentPeriod.bind(this);
    this.changeEndEnrollmentPeriod = this.changeEndEnrollmentPeriod.bind(this);
    this.changeMaxProposersUsers = this.changeMaxProposersUsers.bind(this);
    this.changeRequirePayment = this.changeRequirePayment.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.entity !== prevProps.entity) {
      this.setState({
        name: this.props.entity.name,
        startProposalPeriod: moment(new Date(this.props.entity.data.proposalPeriod.begin)),
        endProposalPeriod: moment(new Date(this.props.entity.data.proposalPeriod.end)),
        startEnrollmentPeriod: moment(new Date(this.props.entity.data.enrollmentPeriod.begin)),
        endEnrollmentPeriod: moment(new Date(this.props.entity.data.enrollmentPeriod.end)),
        maxProposersUsers: this.props.entity.data.maxProposersUsers,
        requirePayment: this.props.entity.data.requirePayment
      })
    }
  }

  changeName(e) {
    const target = e.nativeEvent.target;
    this.setState({
      name: target.value,
    });
  }

  changeMaxProposersUsers(e) {
    const target = e.nativeEvent.target;
    this.setState({
      maxProposersUsers: parseInt(target.value) 
    })
  }

  changeRequirePayment(e) {
    const target = e.nativeEvent.target;
    this.setState({
      requirePayment: target.value 
    })
  }

  changeStartProposalPeriod(date) {
    this.setState({
      startProposalPeriod: date
    })
  }

  changeEndProposalPeriod(date) {
    this.setState({
      endProposalPeriod: date
    })
  }

  changeStartEnrollmentPeriod(date) {
    this.setState({
      startEnrollmentPeriod: date
    })
  }

  changeEndEnrollmentPeriod(date) {
    this.setState({
      endEnrollmentPeriod: date
    })
  }

  render() {
    return(
      <div>
      { this.props.entity &&
        <h5><strong>Alterar dados sobre {this.state.name}</strong></h5>
      }
      <br/>
      <div className="form-group">
        <label htmlFor="form-title">Título da proposta</label>
        <input id="form-title" value={this.state.name} className="form-control" onChange={this.changeName} />
      </div>
      <br/>
      <h6>Datas de proposição das atividades</h6>
      <div>
          <label className="form-title">Começo das proposições: </label>
          <DatePicker selected={this.state.startProposalPeriod} onChange={this.changeStartProposalPeriod} />
          <label className="form-title">Fim das proposições: </label>
          <DatePicker selected={this.state.endProposalPeriod} onChange={this.changeEndProposalPeriod} />
      </div>
      <br/>
      <h6>Datas de inscrição das atividades</h6>
      <div>
          <label className="form-title">Começo das inscrições: </label>
          <DatePicker selected={this.state.startEnrollmentPeriod} onChange={this.changeStartEnrollmentPeriod} />
          <label className="form-title">Fim das inscrições: </label>
          <DatePicker selected={this.state.endEnrollmentPeriod} onChange={this.changeEndEnrollmentPeriod} />
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="form-title">Número máximo de propositores</label>
        <input type="number" value={this.state.maxProposersUsers} id="form-title" className="form-control" onChange={this.changeMaxProposersUsers} />
      </div>
      <div className="form-group">
        <label htmlFor="form-payment">Pagamento é requerido para o acesso</label>
        <select defaultValue={this.state.requirePayment} id="form-payment" className="form-control" onChange={this.changeRequirePayment}>
          <option value={true}>Verdadeiro</option>
          <option value={false}>Falso</option>
        </select>
      </div>
      <br/>
      <span><a style={{width: '100%'}} className="btn btn-primary d-print-none" onClick={() => this.props.editEntity(this.props.entity.slug, this.state)}>
                        Atualizar informações
                        </a>{' '}</span>
      </div>
    )
  }
}

class AdminEntity extends Component {
  constructor (props) {
    super (props);

    this.state = {
    };
  }

  render() {
    return (
      <AdminEntityPane entity={this.props.activities.entity} editEntity={this.props.editEntity} />
    );
  }

}

export default AdminEntity;
