var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.all('*', function(req, res, next) {

    /*if(req.url !== '/authenticate') {

    }*/

    next();
});

router.post('/authenticate', function(req, res) {

    var user = req.body.user;
    var password = req.body.password;

    jwt.sign({ foo: 'bar' }, 'asd', { expiresIn: '24h' }, function(err, token) {
        res.json({user: user, password: password, token: token});
    });

    
});

require('./user')(router);

module.exports = router;
