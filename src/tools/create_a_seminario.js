import Event from '../controllers/event/Event';

const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let eventName;
let eventSubtitle;
let location;
let initialDate;
let finalDate;
let inscInitialDate;
let inscFinalDate;

console.log('Inicializando criação de evento com o template "Seminário CCSA"');

rl.question('Qual o nome do evento? ', (eventName_) => {
  eventName = eventName_;
  rl.question('Qual o subtitulo/tema do evento? ', (eventSubtitle_) => {
    eventSubtitle = eventSubtitle_;
    rl.question('Onde ocorrerá o evento? ', (location_) => {
      location = location_;
      rl.question('Qual a data inicial do evento? (Formato YYYY-MM-DD) ', (initialDate_) => {
        initialDate = initialDate_;
        rl.question('Qual a data final do evento? (Formato YYYY-MM-DD) ', (finalDate_) => {
          finalDate = finalDate_;
          rl.question('Qual a data inicial para inscrições do evento? (Formato YYYY-MM-DD) ', (inscInitialDate_) => {
            inscInitialDate = inscInitialDate_;
            rl.question('Qual a data final para inscrições do evento? (Formato YYYY-MM-DD) ', (inscFinalDate_) => {
              inscFinalDate = inscFinalDate_;
              const event = new Event();

              const data = {
                name: eventName,
                subtitle: eventSubtitle,
                location: location,
                eventPeriodBegin: initialDate,
                eventPeriodEnd: finalDate,
                enrollmentPeriodBegin: inscInitialDate,
                enrollmentPeriodEnd: inscFinalDate,
              };
              event.setData(data)
                .then(() => {
                  return event.store();
                })
                .then(() => {
                  console.log('>> Evento criado no banco de dados');
                });
              rl.close();
            });
          });
        });
      });
    });
  });
});
