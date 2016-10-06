module.exports = function(router) {

    router.get('/admin', function(req, res) {
        res.json({page: 'admin routes'});
    });

    router.get('/admin/*', function(req, res) {
        res.json({page: 'admin routes'});
    });

}