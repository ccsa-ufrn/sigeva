function user(options) {
	this.add('role:user,cmd:create_new', create_new)
	this.add('init:user', init)

	function create_new(msg, respond) {
		respond(null, {answer: "Creating new user"});
	}

	function init(msg, respond) {
		console.log("Initializing...");
		respond(null, {answer: "Initializing"});
	}
}

export default user;
