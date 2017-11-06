import React, { Component } from 'react';

class FooterBar extends Component {
  render() {
    return(<div></div>);
  }
  render() {
    return(
      <footer className="center-on-small-only">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <a href="" className='btn btn-secondary btn-sm'>Reportar erro no sistema</a> <a href="" className='btn btn-secondary btn-sm'>Avaliar o Sigeva</a><br/>
              <small>Sigeva {new Date().getFullYear()} · CCSA UFRN · Todos os direitos reservados · Desenvolvido por <a href='https://ccsa-ufrn.github.io/' target='_blank'>Assessoria Técnica do CCSA - UFRN</a> sob <a target='_blank' href='https://github.com/ccsa-ufrn/sigeva/blob/master/LICENSE'>licença GPLv3</a></small>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterBar;
