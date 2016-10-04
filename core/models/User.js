var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	mail: String,
	phone: String,
	pass: String,
	cpf: String,
	institution: String,
	country: String,
	lattes_url: String,
	linkedin_url: String,
	type: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
