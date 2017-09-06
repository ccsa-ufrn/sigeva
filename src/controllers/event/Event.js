import eventDAO from './EventDAO';
import eventModel from '../../models/event.model';
import * as EventHelper from './EventHelper';

export default class {

	constructor() {
    // [MR] Mudar: Os métodos do DAO podem ser estáticos, não será necessário criar um objeto
    // [MR] com o DAO.
		this.DAO = new eventDAO();
    this.eventObject = this.DAO.createObject();
    // Com o DAO estático ficaria = eventDAO.createObject();
	}

  // [MR] Melhorar os comentários o que o método faz detalhadamente, inclusive informando os
  // [MR] Tipos de parametros e retornos. Utilizar modelo de documentação Javadoc
    // set data
	setData(data_, res) { // [MR] res está definido mas não está sendo utilizado (???)

        let fixed_fields = ['name', 'subtitle', 'active', 'eventPeriod', 'registerPeriod'];
        var errors = []; // Array of errors

        // Validade fixed fields
        fixed_fields.forEach((field) => {
            if (data_[field]) {
                // Validade name
                if (field == 'name') {
                    if (!EventHelper.isBetweenLength(data_[field], 3))
                        errors.push({field: field, message: "Valor inválido para " + field});
                }
                if (field == 'eventPeriod')
                {
                  if (!EventHelper.validaData(data_[field])) {
                    errors.push({field: field, message: "esse formato de data não é compativel" + field});
                  }
                }
                // [MR] Precisa validar todos os campos. Se eventPeriod ou registerPeriod não estiver
                // [MR] no formato de data? não pode deixar essa validação para o DB.

                // Set field in the object
                this.eventObject[field] = data_[field].trim();
            } else { // It's a required field, must be received
                errors.push({field: field, message: "É obrigatório preencher " + field});
                // [MR] Não fazer concatenação de strings com variável. Utilizar string template
                // [MR] "field:field" é o mesmo que apenas field
            }
        });


        // [MR] Identação incorreta
        return new Promise((resolve, reject)=>{

            // [MR] Comentário acima fora do contexto

                        if (errors.length != 0) {
                            reject(errors); // Reject request throwing a set of errors
                        } else {
                            resolve();

                        }
                    });



                    // [MR] Não manter lixo no código!!!
         /*
		this.eventObject.name = data.body.name;
        this.eventObject.subtitle = data.body.subtitle;
        this.eventObject.active = data.body.active;
        this.eventObject.eventPeriod = data.body.eventPeriod;
        this.eventObject.registerPeriod = data.body.registerPeriod;*/
       // this.eventObject.userCreator = data.body.userCreator;

	}

    // [MR] Documentação deve ser de acordo com o Javadoc.
    // [MR] Esse método não pode receber coisas do Router como parametro (req, res)
    // [MR] Uma listagem de objetos não deve retornar todos os eventos. Devem haver filtros e paginações
    // [MR] exemplo de como uma listagem deve funcionar: http://jsonapi.org/examples/#pagination
    // show all event in collection
    listData(req,res) {
        eventModel.find(function (err, event) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(event);
            }    });
    }


    // [MR] Não receber coisas do Router como parametro!!
    // [MR] Uma busca no banco de dados é asíncrona, deve ter um Promise nesse método
    // [MR] Casos de erro devem ser retornados com reject de uma Promise
    // [MR] O nome do método não é coeso, não deve retornar um evento. A funcionalidade deve ser:
    //      carregar no atual eventObject um evento com base no ID passado como parametro.

    // find event by id
    eventById(data, req, res){
        eventModel.findById(data, function (err, event) {
            if (err) {
                res.send(err)
            }
            if (event) {
                res.send(event)
            } else {
                res.send("No event found with that ID")
            } });
    }



  // [MR] documentação necessária. Código mal identado
	store() {
		return new Promise((resolve, reject)=>{
            this.DAO.insertEvent(this.eventObject)
            .then((eventDoc)=>{
              // [MR] Isso aqui vai dar um erro, eventDoc não é definido.
              // [MR] userDoc => eventDoc (?)
                    resolve(EventHelper.formatEvent(eventDoc));
            }).catch(reject);
        });
	}

}
