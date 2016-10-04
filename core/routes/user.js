module.exports = function(router) {

	router.get('/user', function(req, res) {
		res.json({page: 'user get'});
	});

	router.get('/user/:id', function(req, res) {
		res.json({page: 'user get by id'});
	});

	router.post('/user', function(req, res) {
		res.json({page: 'user post by id'});
	});

}
