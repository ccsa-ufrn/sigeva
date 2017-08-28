import eventDAO from './EventDAO'

export default class {

	constructor() {
		this.DAO = new eventDAO();
		this.eventObject = this.DAO.createObject();
	}


	setData(data) {
		this.eventObject.name = data.body.name;
        this.eventObject.subtitle = data.body.subtitle;
        this.eventObject.active = data.body.active;
        this.eventObject.eventPeriod = data.body.eventPeriod;
        this.eventObject.registerPeriod = data.body.registerPeriod;
        this.eventObject.createdAt = data.body.createdAt;
        this.eventObject.userCreator = data.body.userCreator;
	}
	store() {
		this.DAO.insertEvent(this.eventObject);
		// If is a new event 'store()' must call .insertEvent from DAO
		// If is a old event 'store()' must call .updateEvent from DAO
	}

}
