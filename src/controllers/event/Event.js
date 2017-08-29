import eventDAO from './EventDAO'
import eventModel from '../../models/event.model'

export default class {

	constructor() {
		this.DAO = new eventDAO();
		this.eventObject = this.DAO.createObject();
	}

    // set data
	setData(data) {

		this.eventObject.name = data.body.name;
        this.eventObject.subtitle = data.body.subtitle;
        this.eventObject.active = data.body.active;
        this.eventObject.eventPeriod = data.body.eventPeriod;
        this.eventObject.registerPeriod = data.body.registerPeriod;
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
		this.DAO.insertEvent(this.eventObject);
		// If is a new event 'store()' must call .insertEvent from DAO
		// If is a old event 'store()' must call .updateEvent from DAO
	}

}
