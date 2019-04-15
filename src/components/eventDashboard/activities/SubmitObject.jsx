import React, { Component } from 'react';
import InputForm from '../../register/InputForm';
import Dropzone from '../../dropzone/Dropzone';
import UserPicker from '../../userPicker/userPicker';
import moment from 'moment';
import 'moment/locale/pt-br';

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

    this.state = {
      title: "",
      shift: 0,
      syllabus: "",
      vacancies: 0,
      ofFields: [], // value, request
      ofFiles: [],
      ofProposersUsers: [],
      role: this.props.role,
    }

    this.changeTitle = this.changeTitle.bind(this);
    this.changeShift = this.changeShift.bind(this);
    this.changeSyllabus = this.changeSyllabus.bind(this);
    this.changeVacancies = this.changeVacancies.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.changeOfProposersUsers = this.changeOfProposersUsers.bind(this);
    this.addFile = this.addFile.bind(this);
    this.doSubmitObject = this.doSubmitObject.bind(this);
  }

  changeTitle(e) {
    const target = e.nativeEvent.target;
    this.setState({
      title: target.value,
    });
  }

  changeShift(e) {
    const target = e.nativeEvent.target;
    this.setState({
      shift: parseInt(target.value),
    });
  }

  changeSyllabus(e) {
    const target = e.nativeEvent.target;
    this.setState({
      syllabus: target.value,
    });
  }

  changeVacancies(e) {
    const target = e.nativeEvent.target;
    this.setState({
      vacancies: parseInt(target.value),
    });
  }

  handleFieldChange(e) {
    const target = e.nativeEvent.target;
    let currentOfFields = this.state.ofFields;
    const index = currentOfFields.findIndex(el => el.request == target.id);
    if (index == -1) {
      currentOfFields.push({ request: target.id, value: target.value });
    } else {
      currentOfFields[index] = { request: target.id, value: target.value };
    }
    this.setState({
      ofFields: currentOfFields,
    });
  }

  addFile(file) {
    const newFiles = this.state.ofFiles;
    newFiles.push(file._id);
    this.setState({
      ofFiles: newFiles
    });
  }

  changeOfProposersUsers(users_) {
    this.setState({
      ofProposersUsers: users_,
    });
  }

  doSubmitObject() {
    const emailId = this.props.entity.data.ofProposalRequiredFields.filter(field => field.name === 'confirmation-email').map(fieldFiltered => fieldFiltered._id)[0];
    const confirmationEmail = this.state.ofFields.filter(el => el.request === emailId).map(field => field.value)[0]
    this.props.submitObject(this.props.entity.slug, this.state, confirmationEmail);
  }

  render() {
    return(
      <div>
        <h5><strong>Submissão de proposta para {this.props.entity.name}</strong></h5>
        <div className="form-group">
          <label htmlFor="form-title">Título da proposta</label>
          <input id="form-title" className="form-control" onChange={this.changeTitle} />
        </div>
        <div className="form-group">
          <label htmlFor="form-shift">Turno de preferência</label>
          <select id="form-shift" className="form-control" onChange={this.changeShift}>
            <option value={0}>Manhã</option>
            <option value={1}>Tarde</option>
            <option value={2}>Noite</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="form-syllabus">
          { this.props.entity.slug == 'roundtable' ?
            'Proposta' :
            'Ementa'
          }
          </label>
          <textarea onChange={this.changeSyllabus} className="form-control" id="form-syllabus"></textarea>
        </div>
        { this.props.entity.slug != 'roundtable' &&
          <div className="form-group">
            <label htmlFor="form-vacancies">Vagas ofertadas</label>
            <input type="number" className="form-control" onChange={this.changeVacancies} />
          </div>}

        { this.props.entity.data.ofProposalRequiredFields.map( request => (
          <InputForm
            request={request}
            key={request._id}
            handleChange={this.handleFieldChange}
            error={null} />
        ))}
        { this.props.entity.data.ofProposalRequiredFiles.length !== 0 &&
          <strong>Arquivos necessários para submissão</strong>
        }
        {
          this.props.entity.data.ofProposalRequiredFiles.map((fileRequirement) => {
            return(
              <div key={fileRequirement._id}>
                <Dropzone fileRequirementId={fileRequirement._id} onSent={this.addFile} /><br/>
              </div>
            );
          })
        }<br/>
        <strong>Seleção de{' '}
        { this.props.entity.slug == 'roundtable' ?
          'coordenadores' :
          'expositores'
        }
        </strong>
        <UserPicker
          eventId={this.props.eventId}
          maxAuthors={this.props.entity.data.maxProposersUsers}
          initialUserEmail={this.props.userEmail}
          onChange={this.changeOfProposersUsers}
        />
        <div className="form-group">
          <button className="btn btn-success" onClick={this.doSubmitObject}>Submeter proposta</button>
        </div>
      </div>
    );
  }
}

class SubmitObject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submited: false,
    }

    this.doSubmitObject = this.doSubmitObject.bind(this);
  }

  componentDidMount() {
    this.props.loadUserIfNeed();
  }

  doSubmitObject(entity, data) {
    const emailId = this.props.activities.entity.data.ofProposalRequiredFields.filter(field => field.name === 'confirmation-email').map(fieldFiltered => fieldFiltered._id)[0];
    const confirmationEmail = data.ofFields.filter(el => el.request === emailId).map(field => field.value)[0]
    this.props.submitObject(entity, data, confirmationEmail);
    this.setState({
      submited: true,
    })
  }

  render() {
    if (this.props.activities.entity) {
      const entity = this.props.activities.entity;

      const now = new Date();
      const proposalPeriodBegin = new Date(entity.data.proposalPeriod.begin);
      const proposalPeriodEnd = new Date(entity.data.proposalPeriod.end);

      if (proposalPeriodBegin < now && now < proposalPeriodEnd) {
        if (this.state.submited) {
          return (<h5>Submetido com sucesso!</h5>);
        } else {
          return (<SubmissionPane
            eventId={this.props.event.id}
            entity={this.props.activities.entity}
            userEmail={this.props.userSession.logged_user.email}
            submitObject={this.doSubmitObject}
            role={this.props.event.relationship[0].name}
          />);
        }
      } else {
        return (<OutOfDateWarning begin={proposalPeriodBegin} end={proposalPeriodEnd} />);
      }
    }
    return (<div>Desenvolvendo B</div>);
  }
}

export default SubmitObject;
