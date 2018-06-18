import React, { Component } from 'react';
import { loadCertificate } from '../../actions/event';
import moment from 'moment';
import 'moment/locale/pt-br';

class CertificateBoard extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    moment.locale('pt-BR');
    const dt = new Date();
    const day = moment(dt).format('DD');
    const month = moment(dt).format('MMMM');
    const year = moment(dt).format('YYYY');

    return (
      <div>
        <div id='printable' style={{ width: '20cm', height: '15cm', position: 'absolute'}}>
          <img src={this.props.topImage} style={{width: '100%'}} />
          <div style={{display: 'table', margin: '0 auto', marginTop:'1cm', width: '18cm', textAlign: 'justify', verticalAlign:'center'}}>
          {this.props.text}
          <br/>
          <span style={{float:'right'}}>Natal, {`${day} de ${month} de ${year}`}.</span>
          </div>
          <div style={{width: '100%', left: '0px', bottom: '0px', position: 'absolute'}}>
            <img src={this.props.bottomImage} style={{width:'100%'}} />
            <small>Para verificar a validade do certificado acesse http://sigeva.ccsa.ufrn.br/certificado/{this.props.code}</small>
          </div>
        </div>
      </div>
    );
  }
}

class Certificate extends Component {
  constructor (props) {
    super (props);

    this.state = {
      text: '',
      topImage: '',
      bottomImage: '',
    };
  }

  componentDidMount() {
    // props.match.params.code
    loadCertificate(this.props.match.params.code)
      .then((response) => {
        if (!response.error) {
          this.setState({
            text: response.data.resultText,
            topImage: response.data.template.topImage,
            bottomImage: response.data.template.bottomImage,
          });
        }
      });
  }

  render() {
    return (
      <CertificateBoard
        text={this.state.text}
        topImage={this.state.topImage}
        bottomImage={this.state.bottomImage}
        code={this.props.match.params.code}
      />
    );
  }
}

export default Certificate;
