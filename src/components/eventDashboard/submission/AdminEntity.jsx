import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AdminEntityPane extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name : '',
      startSubmissionPeriod: moment(), 
      endSubmissionPeriod: moment(), 
      startEvaluationPeriod: moment(), 
      endEvaluationPeriod: moment(), 
      maxAuthors: 5,
      requirePayment: false,
    };

    this.changeName = this.changeName.bind(this);
    this.changeStartSubmissionPeriod = this.changeStartSubmissionPeriod.bind(this);
    this.changeEndSubmissionPeriod = this.changeEndSubmissionPeriod.bind(this);
    this.changeStartEvaluationPeriod = this.changeStartEvaluationPeriod.bind(this);
    this.changeEndEvaluationPeriod = this.changeEndEvaluationPeriod.bind(this);
    this.changeMaxAuthors = this.changeMaxAuthors.bind(this);
    this.changeRequirePayment = this.changeRequirePayment.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.entity !== prevProps.entity) {
      this.setState({
        name: this.props.entity.name,
        startSubmissionPeriod: moment(new Date(this.props.entity.data.submissionPeriod.begin)),
        endSubmissionPeriod: moment(new Date(this.props.entity.data.submissionPeriod.end)),
        startEvaluationPeriod: moment(new Date(this.props.entity.data.evaluationPeriod.begin)),
        endEvaluationPeriod: moment(new Date(this.props.entity.data.evaluationPeriod.end)),
        maxAuthors: this.props.entity.data.maxAuthors,
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

  changeMaxAuthors(e) {
    const target = e.nativeEvent.target;
    this.setState({
      maxAuthors: parseInt(target.value) 
    })
  }

  changeRequirePayment(e) {
    const target = e.nativeEvent.target;
    this.setState({
      requirePayment: target.value 
    })
  }

  changeStartSubmissionPeriod(date) {
    this.setState({
      startSubmissionPeriod: date
    })
  }

  changeEndSubmissionPeriod(date) {
    this.setState({
      endSubmissionPeriod: date
    })
  }

  changeStartEvaluationPeriod(date) {
    this.setState({
      startEvaluationPeriod: date
    })
  }

  changeEndEvaluationPeriod(date) {
    this.setState({
      endEvaluationPeriod: date
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
      <h6>Datas de submissão dos trabalhos</h6>
      <div>
          <label className="form-title">Começo das submissões: </label>
          <DatePicker selected={this.state.startSubmissionPeriod} onChange={this.changeStartSubmissionPeriod} />
          <label className="form-title">Fim das submissões: </label>
          <DatePicker selected={this.state.endSubmissionPeriod} onChange={this.changeEndSubmissionPeriod} />
      </div>
      <br/>
      <h6>Datas de avaliação dos trabalhos</h6>
      <div>
          <label className="form-title">Começo das avaliações: </label>
          <DatePicker selected={this.state.startEvaluationPeriod} onChange={this.changeStartEvaluationPeriod} />
          <label className="form-title">Fim das avaliações: </label>
          <DatePicker selected={this.state.endEvaluationPeriod} onChange={this.changeEndEvaluationPeriod} />
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="form-title">Número máximo de autores</label>
        <input type="number" value={this.state.maxAuthors} id="form-title" className="form-control" onChange={this.changeMaxAuthors} />
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
      <AdminEntityPane entity={this.props.submission.entity} editEntity={this.props.editEntity} />
    );
  }

}

export default AdminEntity;
