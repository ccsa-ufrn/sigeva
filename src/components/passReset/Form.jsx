import React, { Component } from 'react'


class PassResetHeader extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
        <div className='card board'>
            <div className='card-header'>
              Redefinição de Senha
            </div>
            <div className='card-body'>
              {this.props.children}
            </div>
        </div>
        )
    }
}

class form extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <PassResetHeader>
            <div>
            <form>
              <div className="form-group">
                <label for="newPass"> Digite a nova senha </label>
                <input type="password" className="form-control" id="newPass" placeholder="Nova Senha" />
              </div><div className="form-group">
                <label for="newPassRepeat">Repite a nova senha </label>
                <input type="password" className="form-control" id="newPassRepeat" placeholder="Nova Senha" />
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
            </PassResetHeader>
        )
    }
}

export default form;


