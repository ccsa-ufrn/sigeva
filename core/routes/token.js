module.exports = function(router, private_route, mongoose, config, User, utils, bcrypt, jwt) {

    /**
     * POST token/authenticate
     * Authenticate a user and return a jwt token
     */
    router.post('/token/authenticate', function(req, res) {

        var mail = req.body.mail;
        var password = req.body.password;

        User.findOne({mail: mail}).select('_id mail pass').exec(function(err, user) {

            if(user === null) {
                res.json({status: 'error', errorcode: 1, msg: 'user not exists'});
                return;
            } else {
                bcrypt.compare(password, user.pass, function(err, r) {
                    if(r == true) {
                        jwt.sign({ id: user.id }, config.JWT_KEY, { expiresIn: '24h' }, function(err, token) {
                            res.json({status: 'success', token: token});
                            return;
                        });
                    } else {
                        res.json({status: 'error', errorcode: 2, msg: 'wrong password'});
                        return;
                    }
                });
            }
        });

    });

}

