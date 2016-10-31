module.exports = function(router, mongoose, config, User, UserController, bcrypt) {

	router.get('/user', function(req, res) {
		
		UserController.storeUser();

		User.find().select('_id name mail').exec(function(err, users) {
			res.json({status: 'success', data: users});
		});

	});

	router.get('/user/:id', function(req, res) {

		User.findOne()
		.where('_id').equals(new mongoose.Types.ObjectId(req.params.id)).
		select('_id name mail').
		exec(function(err, user) {
			res.json({status: 'success', data: user});
		});

	});

	router.post('/user', function(req, res) {

		var resInvalid = {status: 'error', msg: 'some fields are required', errorcode: 2};
		var obj = {};

		req.body.name === undefined ? res.json(resInvalid) : obj['name'] = req.body.name;
		req.body.mail === undefined ? res.json(resInvalid) : obj['mail'] = req.body.mail;
		req.body.pass === undefined ? res.json(resInvalid) : obj['pass'] = req.body.pass;
		if(req.body.phone !== undefined) { obj['phone'] = req.body.phone; }
		if(req.body.cpf !== undefined) { obj['cpf'] = req.body.cpf; }
		if(req.body.institution !== undefined) { obj['institution'] = req.body.institution; }
		if(req.body.country !== undefined) { obj['country'] = req.body.country; }
		if(req.body.lattes_url !== undefined) { obj['lattes_url'] = req.body.lattes_url; }
		if(req.body.linkedin_url !== undefined) { obj['linkedin_url'] = req.body.linkedin_url; }
		obj.type = 'common';

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(obj.pass, salt, function(err, hash) {

				obj.pass = hash;

				var user = new User(obj);

				user.save(function(err) {
					if(err) {
						res.json({status: 'error', errorcode: 3, msg: err});
					} else {
						res.json({status: 'success'});
					}
				});

			});
		});

	});

			

}