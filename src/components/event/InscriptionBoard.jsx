import React, { Component } from 'react';

class InscriptionBoard extends Component {
  render() {
    return(
      <div className='card board'>
        <div className='card-header'>
          Inscrição
        </div>
        {/* Usuário logado */}
        <div className='card-body'>
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
        </div>
        {/* Usuário não logado */}
        <div className='card-body'>
          <div className='alert alert-danger'>
            Para efetuar a inscrição é necessário estar logado. <a href='/login'>Fazer login</a>
          </div>
        </div>
        {/* Usuário já inscrito */}
        <div className='card-body'>
          <span>Você já está inscrito neste evento.</span>
          <button className='btn btn-success form-control'>Acessar painel do evento</button>
        </div>
      </div>
    );
  }
}

export default InscriptionBoard;
