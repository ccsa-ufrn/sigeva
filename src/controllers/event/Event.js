import eventDAO from './EventDAO'

export default class {

	constructor() {
		this.DAO = new eventDAO();
		this.eventObject = this.DAO.createObject();
	}

	setData(data) {
		this.eventObject.name = data.name;
	}


	store() {
		this.DAO.insertEvent(this.eventObject);
		// If is a new event 'store()' must call .insertEvent from DAO
		// If is a old event 'store()' must call .updateEvent from DAO
	}

}
