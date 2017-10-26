import Event from './Event'; //
import DateRangeModel from '../../models/event.model';


// [MR] Documentação incompleta

const compareDates = (dateBegin_, dateEnd_) => {
  const str = dateBegin_;
  const date = new Date(str.split('/').reverse().join('/'));
  const str2 = dateEnd_;
  const date2 = new Date(str2.split('/').reverse().join('/'));

  if (date > date2) {
    return false;
  }
  else {
    return true;
  }
};

const periodFormat = (dateBegin_, dateEnd_, local_) => {
  const arrDateBegin = dateBegin_.split('/');
  const stringFormated = arrDateBegin[1] + '-' + arrDateBegin[0] + '-' + arrDateBegin[2];

  const arrDateEnd = dateEnd_.split('/');
  const stringFormated2 = arrDateEnd[1] + '-' + arrDateEnd[0] + '-' + arrDateEnd[2];

  const dateBeginFormated = new Date(stringFormated);
  console.log('Data formatada 1: ' + dateBeginFormated);

  const dateEndFormated = new Date(stringFormated2);
  console.log('Data formatada 2: ' + dateEndFormated);

  const month = new Array(12);
  month[0] = "Janeiro";
  month[1] = "Fevereiro";
  month[2] = "Março";
  month[3] = "Abril";
  month[4] = "Maio";
  month[5] = "Junho";
  month[6] = "Julho";
  month[7] = "Agosto";
  month[8] = "Setembro";
  month[9] = "Outubro";
  month[10] = "Novembro";
  month[11] = "Dezembro";

  console.log(month[dateBeginFormated.getMonth()]);
  console.log(arrDateBegin[0]);

  console.log(month[dateEndFormated.getMonth()]);
  console.log(arrDateEnd[0]);

  const period = arrDateBegin[0] + ' a ' + arrDateEnd[0] + ' de ' + month[dateEndFormated.getMonth()] + ' ' + local_;
  console.log("periodo :" + period);

  return period;

};

const eventFieldsParse = (fields) => {
  let fieldsStr = '';
  const fieldsArray = fields.split(',');
  fieldsArray.forEach((f) => {
    fieldsStr = fieldsStr.concat(f);
    fieldsStr = fieldsStr.concat(' ');
  });
  return fieldsStr;
};

const eventMessage = (eventObject_) =>{
  const dateInicio = eventO
}

const isBetweenLength = (field_, min_, max_ = 255) => {
  // [MR] não se deve reassinar um parametro
  const field = field_.trim(); // Removes spaces bars from the borders
  if (field.length < min_ || field.length > max_) return false;
  return true;
};

// [MR] Documentação é necessária
const formatEvent = (eventObject_) => {
  //const date = new DateRangeModel({ begin: eventObject_.eventPeriodBegin, end: eventObject_.eventPeriodEnd});
  return {
    name: eventObject_.name,
    subtitle: eventObject_.subtitle,
    active: eventObject_.active,
    eventPeriod: eventObject_.eventPeriod,
    registerPeriod: eventObject_.registerPeriod,
    local: eventObject_.local,
  };
};

const validaData = (data) => {
  var reg = /[^\d\/\.]/gi;              // Mascara = dd/mm/aaaa | dd.mm.aaaa
  var valida = data.replace(reg,'');    // aplica mascara e valida só numeros
  if (valida && valida.length == 10) {  // é válida, então ;)
    var ano = data.substr(6),
      mes = data.substr(3,2),
      dia = data.substr(0,2),
      M30 = ['04','06','09','11'],
      v_mes = /(0[1-9])|(1[0-2])/.test(mes),
      v_ano = /(19[1-9]\d)|(20\d\d)|2100/.test(ano),
      rexpr = new RegExp(mes),
      fev29 = ano % 4? 28: 29;

    if (v_mes && v_ano) {
      if (mes == '02') return (dia >= 1 && dia <= fev29);
      else if (rexpr.test(M30)) return /((0[1-9])|([1-2]\d)|30)/.test(dia);
      else return /((0[1-9])|([1-2]\d)|3[0-1])/.test(dia);
    }
  }
  return false                           // se inválida :(
}

export { eventFieldsParse, isBetweenLength, formatEvent, validaData, compareDates, periodFormat };
