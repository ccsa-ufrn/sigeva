module.exports = function(router, private_route, mongoose, config, User, utils, bcrypt, jwt) {

	/**
	 * GET /user 
	 * Get users. Results can be filtered. See parameters.
	 * Anyone, with limited filters options, can see a list of users.
	 * TO DO:
	 *  - Parameters limitation needs to be specified.
	 */
	router.get('/user', function(req, res) {

		/**
		 * Parameter: qtt
		 * Description: quantity of records returned by $pag (default = 10)
		 */
		let qtt = req.query.qtt;

		/**
		 * Parameter: pag
		 * Description: the page of the result. (default = 1)
		 */
		let pag = req.query.pag;

		/**
		 * Parameter: fields
		 * Description: get fields that will be returned by query. (default = _id name [mail])
		 */
		let fields = req.query.fields;

		/**
		 * Parameter: search
		 * Description: search for results that has $search in $searchBy field
		 */
		let search = req.query.search;

		/**
		 * Parameter: searchBy
		 * Description: it indicates the field that will be searched with $search value (default = name)
		 */
		let searchBy = req.query.searchBy;

		/**
		 * Parameter: active
		 * Description: if it's true, return just actives users, otherwise return all (default = true)
		 */
		let active = req.query.active;

		/**
		 * Filtering parameters
		 */
		let blacklist_fields = [];
		let default_fields = '_id name mail';

		let find;
		let find_search = {
			'$regex': search,
			$options: 'i'
		};

		let blacklist_searchBy = [];

		if(req.user === undefined || ( req.user !== undefined && req.user.type !== 'administrator') ) {
			blacklist_fields.push('mail', 'phone', 'cpf', 'country', 'type', 'active');
			default_fields = '_id name';

			blacklist_searchBy.push('phone', 'cpf', 'institution', 'country', 'type');
		}

		fields ? fields = utils.getFields(fields, blacklist_fields) : fields = default_fields;
		fields === '' ? fields = default_fields : (fields = fields);
		active ? (active = active) : active = 'true';
		qtt ? qtt = parseInt(qtt) : qtt = 10;
		pag ? pag = parseInt(pag) : pag = 1;

		/** Erro nessa linha aqui em baixo */
		search ? ( 
			utils.getFields(searchBy, blacklist_searchBy) 
			? find = {[searchBy] : find_search} 
			: find = {name: find_search} 
		) 
		: find = null;

		/**
		 * Executing query
		 */
		User
		.find(find)
		.select(fields)
		.skip( (pag-1)*qtt )
		.limit(qtt)
		.exec(function(err, users) {

			User
			.find(find)
			.select(fields)
			.count(function(err, count) {
				res.json({status: 'success', data: users, count: count});
			});

		});

	});

	/**
	 * GET /user/:id
	 * Get an user by :id. Result can be filtered. See parameters.
	 * Any authenticated user, with limited filters options, can see a list of users.
	 * Only the own user can see all information about your profile.
	 * TO DO:
	 *  - Parameters limitation needs to be specified.
	 */
	router.get('/user/:id', function(req, res) {

		res.json({});

		/*User.findOne()
		.where('_id').equals(new mongoose.Types.ObjectId(req.params.id)).
		select('_id name mail').
		exec(function(err, user) {
			res.json({status: 'success', data: user});
		});*/

	});

	/**
	 * POST /user
	 * Create a new user.
	 * Anyone, with an access token, can create a new user.
	 * 
	 * TO DO:
	 *  - It requires an access token to avoid CSRF.
	 *  - It needs to create an security system to avoid overhead of requests.
	 */
	router.post('/user', function(req, res) {

		var resInvalid = {
			status: 'error', 
			msg: 'some fields are required', 
			errorcode: 2
		};
		var obj = {};

		req.body.name ? obj['name'] = req.body.name : res.json(resInvalid);
		req.body.mail === undefined ? res.json(resInvalid) : obj['mail'] = req.body.mail;
		req.body.pass === undefined ? res.json(resInvalid) : obj['pass'] = req.body.pass;
		if(req.body.phone !== undefined) { obj['phone'] = req.body.phone; }
		if(req.body.cpf !== undefined) { obj['cpf'] = req.body.cpf; }
		if(req.body.institution !== undefined) { obj['institution'] = req.body.institution; }
		if(req.body.country !== undefined) { obj['country'] = req.body.country; }
		if(req.body.lattes_url !== undefined) { obj['lattes_url'] = req.body.lattes_url; }
		if(req.body.linkedin_url !== undefined) { obj['linkedin_url'] = req.body.linkedin_url; }
		obj.type = 'common';
		obj.active = true;

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

	router.post('/user/upload-photo', private_route, function(req, res) {
		res.json({});
	});

	router.put('/user/:id', private_route, function(req, res) {
		res.json({});
	});

	router.delete('/user/:id', private_route, function(req, res) {
		res.json({});
	});

}