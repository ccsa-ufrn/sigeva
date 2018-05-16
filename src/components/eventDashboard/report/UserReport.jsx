import React, { Component } from 'react';

class UserReport extends Component {
  render() {
    return (
      <div id="printable">
        <h5><strong>Relatório de Inscrito</strong> <a href="#" className="btn btn-success" onClick={this.props.clearUser}>Voltar</a> <a href="#" className="btn btn-success" onClick={window.print}>Imprimir</a></h5>
        <div className="card">
          <div className="card-header"><strong>{this.props.user.name} ({this.props.user.email})</strong></div>
          <div className="card-body">
            {
              this.props.user.ofFields &&
              this.props.user.ofFields.map((field) => {
                return (<div key={field._id}><strong>{field.readableName}</strong>: {field.value}</div>)
              })
            }
            <div><strong>Papéis</strong>:{' '}
            {
              this.props.user.roles.map((rol, idx) => {
                return (<span key={idx}>{rol}{ idx == this.props.user.roles.length - 1 ? '' : ',' }</span>)
              })
            }
            </div>
          </div>
        </div><br/>
        <div className="card">
          <div className="card-header">Artigos submetidos</div>
          <div className="card-body">
            { this.props.user.articles &&
              this.props.user.articles.map((article) => {
                return (
                  <div key={article._id}>
                    <h5>{article.data.title}</h5>
                    <div>
                      Autores:{' '}
                      {article.data.authors.map((author, idx) => {
                        return (<span key={idx}>{author.name}{ idx == article.data.authors.length - 1 ? '':','}</span>)
                      })} <br/>
                      Estado:{' '}
                      { article.data.state == 'waiting_evaluation' ? 'Esperando avaliação' :
                        article.data.state == 'rejected' ? 'Rejeitado' :
                        article.data.state == 'approved' ? 'Aprovado' : 
                        article.data.state == 'present' ? 'Apresentado' : 'Indefinido'
                      }
                    </div>
                    <hr/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="card-header">Pôsteres submetidos</div>
          <div className="card-body">
            { this.props.user.posters &&
              this.props.user.posters.map((poster) => {
                return (
                  <div key={poster._id}>
                    <h5>{poster.data.title}</h5>
                    <div>
                      Autores:{' '}
                      {poster.data.authors.map((author, idx) => {
                        return (<span key={idx}>{author.name}{ idx == poster.data.authors.length - 1 ? '':','}</span>)
                      })} <br/>
                      Estado:{' '}
                      { poster.data.state == 'waiting_evaluation' ? 'Esperando avaliação' :
                        poster.data.state == 'rejected' ? 'Rejeitado' :
                        poster.data.state == 'approved' ? 'Aprovado' :
                        poster.data.state == 'present' ? 'Apresentado' : 'Indefinido'
                      }
                    </div>
                    <hr/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="card-header">Casos para ensino submetidos</div>
          <div className="card-body">
            { this.props.user.teachingcases &&
              this.props.user.teachingcases.map((tc) => {
                return (
                  <div key={tc._id}>
                    <h5>{tc.data.title}</h5>
                    <div>
                      Autores:{' '}
                      {tc.data.authors.map((author, idx) => {
                        return (<span key={idx}>{author.name}{ idx == tc.data.authors.length - 1 ? '':','}</span>)
                      })} <br/>
                      Estado:{' '}
                      { tc.data.state == 'waiting_evaluation' ? 'Esperando avaliação' :
                        tc.data.state == 'rejected' ? 'Rejeitado' :
                        tc.data.state == 'approved' ? 'Aprovado' : 
                        tc.data.state == 'present' ? 'Apresentado' : 'Indefinido'
                      }
                    </div>
                    <hr/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="card-header">Atividades inscrito</div>
          <div className="card-body">
            { this.props.user.activities &&
              this.props.user.activities.map((atv) => {
                return (
                  <div key={atv._id}>
                    <h5>{atv.data.title}</h5>
                    <div>
                      Tipo de atividade:{' '}
                      { atv.entity == 'roundtable'  ? 'Mesa-redonda'  :
                        atv.entity == 'minicourse'  ? 'Minicurso'     :
                        atv.entity == 'workshop'    ? 'Oficina'       :
                        atv.entity == 'conference'  ? 'Conferência'   :
                        'Indefinido'
                      } <br/>
                      Propositores da atividade:{' '}
                      {atv.data.ofProposersUsers.map((proposer, idx) => {
                        return (<span key={idx}>{proposer.name} ({proposer.email}) { idx == atv.data.ofProposersUsers.length - 1 ? '':','}</span>)
                      })} <br/>
                    </div>
                    <hr/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UserReport;
