module.exports = function(router, mongoose, config, User) {

	router.get('/user', function(req, res) {
		
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
		res.json({page: 'user post by id'});
	});

}
