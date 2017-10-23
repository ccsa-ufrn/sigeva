import React, { Component } from 'react';

class InscriptionBoardHeader extends Component {
  render() {
    return(
      <div className='card board'>
        <div className='card-header'>
          Inscrição
        </div>
        <div className='card-body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class InscriptionBoard extends Component {
  render() {
    if (this.props.userSession.logged_user) {
      return (
        <div>
        <InscriptionBoardHeader>
          <div className='form-group'>
            <label htmlFor='enrollAs'>Inscrever-se como</label>
            <select className='form-control' id='enrollAs'>
              <option>Discente</option>
              <option>Docente</option>
              <option>Técnico Administrativo</option>
              <option>Sem vínculo institucional</option>
            </select>
          </div>
          <button className='btn btn-success form-control'>Efetuar inscrição</button>
        </InscriptionBoardHeader>
        <InscriptionBoardHeader>
          <span>Você já está inscrito neste evento.</span>
          <button className='btn btn-success form-control'>Acessar painel do evento</button>
        </InscriptionBoardHeader>
        </div>
      );
    } else {
      return(
        <InscriptionBoardHeader>
          <div className='alert alert-danger'>
            Para efetuar a inscrição é necessário estar logado. <a href='/login'>Fazer login</a>
          </div>
        </InscriptionBoardHeader>
      );
    }
  }
}

export default InscriptionBoard;
