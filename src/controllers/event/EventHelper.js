import Event from './Event'; //

// [MR] Documentação incompleta

const eventFieldsParse = (fields) => {
  let fieldsStr = '';
  const fieldsArray = fields.split(',');
  fieldsArray.forEach((f) => {
    fieldsStr = fieldsStr.concat(f);
    fieldsStr = fieldsStr.concat(' ');
  });
  return fieldsStr;
};

const isBetweenLength = (field_, min_, max_ = 255) => {
  // [MR] não se deve reassinar um parametro
  const field = field_.trim(); // Removes spaces bars from the borders
  if (field.length < min_ || field.length > max_) return false;
  return true;
};

// [MR] Documentação é necessária
const formatEvent = (eventObject_) => {
  return {
    name: eventObject_.name,
    subtitle: eventObject_.subtitle,
    active: eventObject_.active,
    eventPeriod: eventObject_.eventPeriod,
    registerPeriod: eventObject_.registerPeriod,
  };
};





 const validaData = (data) => {
      var reg = /[^\d\/\.]/gi;                  // Mascara = dd/mm/aaaa | dd.mm.aaaa
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

export { eventFieldsParse, isBetweenLength, formatEvent, validaData };
