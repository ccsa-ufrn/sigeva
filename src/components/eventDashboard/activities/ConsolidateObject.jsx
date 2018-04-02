import React, { Component } from 'react';

class ConsolidateObject extends Component {
  render() {
    return(
      <div>
        <h5><strong>Criar bloco de atividades</strong></h5>
        <div className="form-group row">
          <div className="col-md-4">
            <label htmlFor="form-day">Dia</label>
            <input type="number" id="form-day" className="form-control" min="1" max="31"/>
          </div>
          <div className="col-md-4">
            <label htmlFor="form-month">Mês</label>
            <select id="form-month" className="form-control">
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="form-year">Ano</label>
            <input type="number" id="form-year" className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="form-shift">Turno</label>
            <select id="form-shift" className="form-control">
              <option value="0">Manhã</option>
              <option value="1">Tarde</option>
              <option value="2">Noite</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <a href="" className="form-control btn btn-success">Adicionar bloco de atividades</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ConsolidateObject;
