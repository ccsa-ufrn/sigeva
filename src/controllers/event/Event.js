import eventDAO from './EventDAO'
import eventModel from '../../models/event.model'
import * as EventHelper from './EventHelper';

export default class {

	constructor() {
		this.DAO = new eventDAO();
		this.eventObject = this.DAO.createObject();
	}

    // set data
	setData(data_, res) {

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

                // Set field in the object
                this.eventObject[field] = data_[field].trim();
            } else { // It's a required field, must be received
                errors.push({field: field, message: "É obrigatório preencher " + field});
            }
        });



        return new Promise((resolve, reject)=>{
            // Validate user email existence

                        if (errors.length != 0) {
                            reject(errors); // Reject request throwing a set of errors
                        } else {
                            resolve();

                        }
                    });



         /*
		this.eventObject.name = data.body.name;
        this.eventObject.subtitle = data.body.subtitle;
        this.eventObject.active = data.body.active;
        this.eventObject.eventPeriod = data.body.eventPeriod;
        this.eventObject.registerPeriod = data.body.registerPeriod;*/
       // this.eventObject.userCreator = data.body.userCreator;

	}

    // show all event in collection
    listData(req, res) {
        eventModel.find(function (err, event) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(event);
            }    });
    }


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




	store() {
		return new Promise((resolve, reject)=>{
            this.DAO.insertEvent(this.eventObject)
            .then((userDoc)=>{
                    resolve(EventHelper.formatEvent(eventDoc));
            }).catch(reject);
        });
	}

}
