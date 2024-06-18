import React, { Component } from 'react';
import UserPicker from '../../userPicker/userPicker';
import Dropzone from '../../dropzone/Dropzone';
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

    let thematicGroups = [];
    if (this.props.entity.slug == 'teachingcases') {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name === 'Casos para Ensino'));
    } else if (this.props.entity.slug == 'extensionreport') {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name === 'Relato de Experiências Extensionistas'))
    } else {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name !== 'Casos para Ensino'));
    }

    let thematicGroup = null;
    if (thematicGroups.length > 0) {
      thematicGroup = thematicGroups[0].data._id;
    }

    this.state = {
      title: "",
      abstract: "",
      keywords: "",
      thematicGroup: thematicGroup,
      users: [],
      files: [],
      thematicGroups: thematicGroups,
    }

    this.changeUsers = this.changeUsers.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeAbstract = this.changeAbstract.bind(this);
    this.changeKeywords = this.changeKeywords.bind(this);
    this.changeTG = this.changeTG.bind(this);
    this.addFile = this.addFile.bind(this);
    this.doSubmitObject = this.doSubmitObject.bind(this);
  }

  changeTitle(e) {
    const target = e.nativeEvent.target;
    this.setState({
      title: target.value,
    });
  }

  changeAbstract(e) {
    const target = e.nativeEvent.target;
    this.setState({
      abstract: target.value,
    });
  }

  changeKeywords(e) {
    const target = e.nativeEvent.target;
    this.setState({
      keywords: target.value,
    });
  }

  changeTG(e) {
    const target = e.nativeEvent.target;
    this.setState({
      thematicGroup: target.value,
    });
  }

  changeUsers(users_) {
    this.setState({
      users: users_,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let thematicGroups = [];

    if (this.props.entity.slug == 'teachingcases') {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name === 'Casos para Ensino'));
    } else {
      thematicGroups = this.props.thematicGroups.filter((el => el.data.name !== 'Casos para Ensino'));
    }

    if (this.state.thematicGroups.length != thematicGroups.length) {
      this.setState({
        thematicGroups: thematicGroups,
      });
    }

    if (this.state.thematicGroup == null) {
      if (thematicGroups.length > 0) {
        this.setState({
          thematicGroup: thematicGroups[0].data._id,
        });
      }
    }
  }

  addFile(file) {
    const newFiles = this.state.files;
    newFiles.push(file._id);
    this.setState({
      files: newFiles
    });
  }

  doSubmitObject() {
    this.props.submitObject(this.props.entity.slug, this.state);
  }

  render() {
    return (
      <div>
        <h5><strong>Submissão do tipo "{this.props.entity.name}"</strong></h5>
        <div className="form-group">
          <label htmlFor="form-title">Título do trabalho</label>
          <input id="form-title" className="form-control" onChange={this.changeTitle} />
        </div>
        <div className="form-group">
          <label htmlFor="form-abstract">Resumo</label>
          <textarea id="form-abstract" className="form-control" onChange={this.changeAbstract}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="form-keywords">Palavras-chave</label>
          <input id="form-keywords" className="form-control" onChange={this.changeKeywords} />
        </div>
        <div className="form-group">
          <label htmlFor="form-tgs">Grupo temático</label>
          <select id="form-tgs" className="form-control" onChange={this.changeTG}>
            { this.state.thematicGroups &&
              this.state.thematicGroups.map((tg) => {
                return (<option key={tg.data._id} value={tg.data._id}>{tg.data.name}</option>);
              })
            }
          </select><br/>
          <strong>Seleção de co-autores</strong><br/>
          <UserPicker
            eventId={this.props.eventId}
            maxAuthors={this.props.entity.data.maxAuthors}
            initialUserEmail={this.props.userEmail}
            onChange={this.changeUsers}
          />
          <strong>Arquivos necessários para submissão</strong>
          {
            this.props.entity.data.ofRequiredFiles.map((fileRequirement) => {
              return(
                <div key={fileRequirement._id}>
                  <Dropzone fileRequirementId={fileRequirement.fileRequirement} onSent={this.addFile} /><br/>
                </div>
              );
            })
          }
          <div className="form-group">
            <button className="btn btn-success" onClick={this.doSubmitObject}>Submeter trabalho</button>
          </div>
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
    this.props.loadObjectsToEvaluate(this.props.entity);
    this.props.loadThematicGroups();
  }

  doSubmitObject(entity, data) {
    this.props.submitObject(entity, data);
    this.setState({
      submited: true,
    })
  }

  render() {
    if (this.props.submission.entity) {
      const entity = this.props.submission.entity;
      // Handle payment requirement
      if (entity.data.requirePayment === true) {
        if (this.props.payment.approved === false) {
          // Payment is required but the user did not paid
          if (!this.props.isTGCoordinator) { // coordinators has privileges
            return (<PaymentRequiredWarning/>);
          }
        }
      }
      // Payment if required was approved or was not required
      // Check if the submission period if active
      const now = new Date();
      const submissionPeriodBegin = new Date(entity.data.submissionPeriod.begin);
      const submissionPeriodEnd = new Date(entity.data.submissionPeriod.end);

      if (submissionPeriodBegin < now && now < submissionPeriodEnd) {
        if (this.state.submited) {
          return (<h5>Submetido com sucesso!</h5>);
        } else {
          return (<SubmissionPane
            eventId={this.props.eventId}
            entity={this.props.submission.entity}
            thematicGroups={this.props.thematicGroups}
            userEmail={this.props.userSession.logged_user.email}
            submitObject={this.doSubmitObject}
          />);
        }
      } else {
        return (<OutOfDateWarning begin={submissionPeriodBegin} end={submissionPeriodEnd} />);
      }

      //return (<SubmissionPane eventId={this.props.eventId} entity={this.props.submission.entity} thematicGroups={this.props.thematicGroups} userEmail={this.props.userSession.logged_user.email}/>);

    }

    return (<div>Carregando...</div>);

  }
}

export default SubmitObject;
