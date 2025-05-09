import React, { Component } from 'react';
import moment from 'moment';

class OutOfDateWarning extends Component {
  render() {
    moment.locale('pt-BR');

    let message = `Fora do período aceitável para inscrições`;

    if (new Date() < this.props.begin) {
      message = `Inscrições deste tipo de objeto somente será permitida
      a partir de ${moment(this.props.begin).format('LL')}`;
    } else {
      message = `As inscrições deste tipo de objeto não são mais aceitas desde
      ${moment(this.props.end).format('LL')}`;
    }

    return(
      <div className='alert alert-danger' role='alert'>
        <h5><strong>Acesso indisponível</strong></h5>
        <p>Após o dia 22, os alunos podem participar das atividades no dia, desde que hajam vagas, haverá uma lista para colocar suas informações, se o aluno tiver com a situação de pagamento regularizada(isento ou com pagamento aprovado), nós conseguimos incluir o certificado após o evento sem maiores problemas</p>
        {message}
      </div>
    );
  }
}

class EnrollButton extends Component {
  render() {
    return(
    <span><a className={"btn btn-" + this.props.style}
        onClick={this.props.onClick}
        target="blank_">
        {this.props.text}
    </a>{' '}</span>
    )
  }
}

class SeeAllObjectsToEnrollPane extends Component {
  constructor(props) {
    super(props);

    this.enroll = this.enroll.bind(this);
    this.exit = this.exit.bind(this);
    this.checkEnrollment = this.checkEnrollment.bind(this);
  }

  componentDidMount() {
    this.props.loadObjects(this.props.entity, this.props.userSession.logged_user.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entity !== this.props.entity) {
      this.props.loadObjects(this.props.entity, this.props.userSession.logged_user.id);
    }
  }

  enroll(enrollObject) {
    if(this.checkEnrollment({sessions: enrollObject.sessions, entity: this.props.entity}) == 0) {
      this.props.enroll(this.props.entity, enrollObject);
    }
  }

  exit(enrollObject) {
      this.props.exit(this.props.entity, enrollObject);
  }

  checkEnrollment(object) {
    const sessions = Array.from((this.props.listOfEnrolledSessions.map(obj => obj.sessions)).reduce((arr, e) => arr.concat(e), []));
    const matchingList = object.sessions.reduce((filtered, option) => {
      if(sessions.filter(obj => !(obj.finalDate < option.initialDate || obj.initialDate >= option.finalDate)).length !== 0) {
        filtered.push(1);
      }
      return filtered;
    }, []);
    return matchingList;
  }

  render() {
    return(
      <div>
        <h5><strong>Todas propostas disponíveis{' '}
          { this.props.allObjectsToEnroll &&
            `(${this.props.allObjectsToEnroll.length})`
          }
        </strong></h5>
        <h3><strong style={{ color: 'red'}}>ATENÇÃO: </strong> As inscrições em atividades vão até amanhã dia 22 de Setembro, após isso, os alunos podem participar das atividades no dia, DESDE QUE hajam vagas, haverá uma lista para colocar suas informações, se o aluno tiver com a situação de pagamento regularizada(isento ou com pagamento aprovado), nós conseguimos incluir o certificado após o evento sem maiores problemas</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Propositores</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.allObjectsToEnroll &&
              this.props.listOfEnrolledSessions &&
              this.props.allObjectsToEnroll.filter(obj => !obj.data.deleted).map((object) => {
                return (
                  <tr key={object._id}>
                    <td>
                      <strong>{object.data.title}</strong>
                      <br/>
                      <strong>Horários</strong>:{' '}
                      { object.data.consolidation.sessions &&
                        object.data.consolidation.sessions.map((session) => {
                          const initialDate = new Date(session.initialDate)
                          const finalDate = new Date(session.finalDate)
                          return (
                             `${initialDate.getDate()}/${initialDate.getMonth()+1}/${initialDate.getFullYear()} a partir de ${('0'+initialDate.getHours()).slice(-2)}:${('0'+initialDate.getMinutes()).slice(-2)} até ${('0'+finalDate.getHours()).slice(-2)}:${('0'+finalDate.getMinutes()).slice(-2)}` + '\n'
                          );
                        })
                      }
                      <br/>
                      <strong>Local</strong>:{' '}
                      { object.data.consolidation &&
                          object.data.consolidation.location
                      }
                      <br/>
                      <strong>Vagas preenchidas</strong>:{object.data.ofEnrollments.length} de { object.data.consolidation.vacancies === 0 ? 'Sem limites': object.data.consolidation.vacancies }
                      <br/>
                      <p style={{textAlign: 'justify'}}>
                      <strong>Ementa</strong>: { object.data.syllabus }</p>
                      { object.data.ofFields &&
                        object.data.ofFields.filter(field => field.request.name == "debaters").map((field) => {
                          return (
                            <p key={field._id} style={{textAlign: 'justify'}}>
                              <strong>{field.request.readableName}</strong>: {field.value}
                            </p>
                          );
                        })
                      }
                      {
                        !object.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(this.props.userSession.logged_user.id) &&
                        this.props.payed &&
                        <EnrollButton onClick={() => this.enroll({ activityId: object._id,
                          userId: this.props.userSession.logged_user.id,
                          sessions: object.data.consolidation.sessions})}
                          style={'primary'} text={'Inscrever-se'} />
                      }
                      {
                        object.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(this.props.userSession.logged_user.id) &&
                        this.props.payed &&
                        <EnrollButton onClick={() => this.exit({ activityId: object._id,
                          userId: this.props.userSession.logged_user.id,
                          sessions: object.data.consolidation.sessions})}
                          style={'danger'} text={'Desfazer inscrição'} />
                      }
                      {
                        this.checkEnrollment({ sessions: object.data.consolidation.sessions, entity: this.props.entity}) != 0 &&
                        !object.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(this.props.userSession.logged_user.id) &&
                        this.props.payed &&
                        <p>Você já está inscrito em uma atividade que conflita com essa em relação a horários</p>
                      }
                      { !this.props.payed &&
                        <p>É preciso fazer o pagamento da taxa de inscrição para poder ter acesso as atividades do evento</p>
                      }
                    </td>
                    <td>
                      {
                        object.data.ofProposersUsers.map((author) => {
                          return (<span key={author._id}>{`${author.name} (${author.email})`}<br/></span>)
                        })
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}


class SeeAllObjectsToEnroll extends Component {

  componentDidMount() {
    this.props.loadThematicGroups();
  }

  render() {
    let thematicGroupsCoordinators = this.props.thematicGroups.thematicGroups.map(object => object.data.coordinators);
    thematicGroupsCoordinators = Array.from(thematicGroupsCoordinators.reduce((arr, e) => arr.concat(e), [])).map(object => object._id);
    if (this.props.activities.entity) {
      const entity = this.props.activities.entity;
      const listOfProposers = Array.from(this.props.allObjectsToEnroll.map(object => object.data.ofProposersUsers.map(user => user._id))).reduce((arr, e) => arr.concat(e), []);
      let payed = true;
      // Handle payment requirement
      if (entity.data.requirePayment === true) {
        if (this.props.payment.approved === false) {
          if(!listOfProposers.includes(this.props.userSession.logged_user.id) && !thematicGroupsCoordinators.includes(this.props.userSession.logged_user.id))
            payed = false;
          } else {
            payed = true;
          }
      }

      const now = new Date();
      const enrollmentPeriodBegin = new Date(entity.data.enrollmentPeriod.begin);
      const enrollmentPeriodEnd = new Date(entity.data.enrollmentPeriod.end);

      if (enrollmentPeriodBegin < now && now < enrollmentPeriodEnd) {
          return (<SeeAllObjectsToEnrollPane entity={this.props.entity}
            userSession={this.props.userSession}
            allObjectsToEnroll={this.props.allObjectsToEnroll}
            allObjectsUserEnrolled={this.props.allObjectsUserEnrolled}
            listOfEnrolledSessions={this.props.listOfEnrolledSessions}
            loadObjects={this.props.loadObjects}
            enroll={this.props.enroll}
            exit={this.props.exit}
            payed={payed}
            />);
        } else {
        return (<OutOfDateWarning begin={enrollmentPeriodBegin} end={enrollmentPeriodEnd} />);
      }
    } else {
      return (<div>Desenvolvendo B</div>);
    }
  }
}

export default SeeAllObjectsToEnroll;
