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
    const roundTables = this.props.listOfEnrolledSessions.filter(obj => obj.entity == "roundtable" || obj.entity == "conference" || obj.entity == "workshop");
    const minicourse = this.props.listOfEnrolledSessions.filter(obj => obj.entity == "minicourse");
    const roundTablesSessions = Array.from((roundTables.map(obj => obj.sessions)).reduce((arr, e) => arr.concat(e), []));
    const minicourseSessions = Array.from((minicourse.map(obj => obj.sessions)).reduce((arr, e) => arr.concat(e), []));
    const matchingList = object.sessions.reduce((filtered, option) => {
      if(object.entity == "roundtable" || object.entity == "conference" || object.entity == "workshop") {
        if(roundTablesSessions.filter(obj => obj.date == option.date && obj.shift == option.shift).length !== 0) {
          filtered.push(1);
        }
      } else {
        if(minicourseSessions.filter(obj => obj.date == option.date && obj.shift == option.shift).length !== 0) {
          filtered.push(1);
        }
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
        <h6>Os horários detalhados podem ser encontrados no site seminario.ccsa.ufrn.br</h6>
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
              this.props.allObjectsToEnroll.map((object) => {
                const userEnrollment = object.data.ofEnrollments.find(enrollment => enrollment.user._id == this.props.userSession.logged_user.id);
                return (
                  <tr key={object._id}>
                    <td>
                      <strong>{object.data.title}</strong>
                      <br/>
                      <strong>Horários</strong>:{' '}
                      { object.data.consolidation.sessions &&
                        object.data.consolidation.sessions.map((session) => {
                          const date = new Date(session.date)
                          return (
                             session.shift === 0 ? `Manhã do dia ${date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}` + '\n':
                             session.shift === 1 ? `Tarde do dia ${date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}` + '\n' :
                             session.shift === 2 ? `Noite do dia ${date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}` + '\n' : 'Indefinido'
                          );
                        })
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
                        object.data.ofEnrollments.map(enrollment => enrollment.user._id).includes(this.props.userSession.logged_user.id) &&
                        userEnrollment &&
                        userEnrollment.cert &&
                        this.props.payed &&
                        <a target='_blank' href={`/certificado/${userEnrollment.cert}`} className='btn btn-primary'>Certificado</a>
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
