module.exports = function(router) {

	router.get('/user', function(req, res) {
		res.json({page: 'all users'});
	});

	router.get('/user/create', function(req, res) {
		res.json({page: 'user create'});
	});

	router.get('/user/edit', function(req, res) {
		res.json({page: 'user edit'});
	});

}
