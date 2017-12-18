import React, { Component } from 'react'
import MainLayout from '../layout/MainLayout';
import Error404 from '../error/Error404';

class PassResetHeader extends Component {
    render(){
        return (
        <div className='card board'>
            <div className='card-header'>
              Recuperação de Senha
            </div>
            <div className='card-body'>
              {this.props.children}
            </div>
        </div>
        )
    }
}

class PassReset extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <PassResetHeader>
             <div className="form-group">
                <label for="email">Digite Seu Email</label>
                <input type="text" className="form-control" id="email"/>
                <button type="button" className="btn btn-primary">Enviar</button>
              </div>
            </PassResetHeader>
        )
    }
}

export default PassReset;


