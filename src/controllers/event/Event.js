import EventDAO from './EventDAO';
import eventModel from '../../models/event.model';
import * as EventHelper from './EventHelper';

/**
 * User
 * Stores and manipulates User Database Object
 */
export default class {
  /**
   * Initialize a User instance creating a userDAO and requesting a empty Object.
   */
  constructor() {
    // [MR] Mudar: Os métodos do DAO podem ser estáticos, não será necessário criar um objeto
    // [MR] com o DAO.
    // Com o DAO estático ficaria = eventDAO.createObject();
    this.DAO = new EventDAO();
    this.eventObject = this.DAO.createObject();
  }
  // [MR] Melhorar os comentários o que o método faz detalhadamente, inclusive informando os
  // [MR] Tipos de parametros e retornos. Utilizar modelo de documentação Javadoc

  /**
   * Validate and sets event informations
   * @param data set of fields to load
   * @error message.
   */
  setData(data_) {
    const fixedFields = ['name', 'subtitle', 'active', 'eventPeriod', 'registerPeriod'];
    const errors = []; // Array of errors

    fixedFields.forEach((field) => {
      if (data_[field]) {
        // Validade name
        if (field === 'name') {
          if (!EventHelper.isBetweenLength(data_[field], 3)) {
            // Throw invalid name error
            // TODO: A name of user must have at least 1 space
            errors.push({
              field,
              message: 'Valor inválido para nome',
            });
          }
        }

        // Validate email
        if (field === 'eventPeriod' || field === 'registerPeriod') {
          if (!EventHelper.validaData(data_[field])) {
            // Throw invalid email error
            errors.push({
              field,
              message: 'Valor inválido para a data',
            });
          }
        }
        // Set field in the object
        this.eventObject[field] = data_[field].trim();
      } else {
        // It's a required field, must be received
        errors.push({
          field,
          message: 'É obrigatório preencher este campo',
        });
      }
    });

    // [MR] Identação incorreta
    return new Promise((resolve, reject) => {
      if (errors.length !== 0) {
        reject(errors);
      } else {
        resolve();
      }
    });
  }

  // [MR] Documentação deve ser de acordo com o Javadoc.
  // [MR] Esse método não pode receber coisas do Router como parametro (req, res)
  // [MR] Uma listagem de objetos não deve retornar todos os eventos. Devem haver filtros e paginações
  // [MR] exemplo de como uma listagem deve funcionar: http://jsonapi.org/examples/#pagination
  // show all event in collection
  /**
   * List all event information
   * @param
   * @error
   */
  listData(req, res) {
    eventModel.find(function (err, event) {
      if (err) {
        res.status(500).send(err);
      } else {
        const count = Object.keys(event).length;
        for (let i = 0; i < count; i++) {
          console.log('Evento:');
          console.log(JSON.stringify(event[i].name));
          console.log(JSON.stringify(event[i].subtitle));
          console.log(JSON.stringify(event[i].eventPeriod));
          console.log(JSON.stringify(event[i].registerPeriod));
    }
        res.send(event);
      }
    });
  }


  // [MR] Não receber coisas do Router como parametro!!
  // [MR] Uma busca no banco de dados é asíncrona, deve ter um Promise nesse método
  // [MR] Casos de erro devem ser retornados com reject de uma Promise
  // [MR] O nome do método não é coeso, não deve retornar um evento. A funcionalidade deve ser:
  // carregar no atual eventObject um evento com base no ID passado como parametro.
  /**
   * List a singular event
   * @param id event
   * @error
   */
  loadById(data_, req, res){
    eventModel.findById(data_, function (err, event) {
      if (err) {
        res.send(err);
      }
      if (event) {
        res.send(event);
      } else {
        res.send("No event found with that ID");
      }
    });
  }

  // [MR] documentação necessária. Código mal identado
  store() {
    return new Promise((resolve, reject) => {
      this.DAO.insertEvent(this.eventObject)
        .then((eventDoc) => {
          resolve(EventHelper.formatEvent(eventDoc));
        }).catch(reject);
    });
  }
}
