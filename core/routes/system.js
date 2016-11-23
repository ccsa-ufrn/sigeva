module.exports = function(router, private_route, mongoose, config, User, utils, bcrypt, jwt) {

    /**
     * GET system/setup
     * Bootstraps the app, it can be executed only one time
     */
    router.get('/system/setup', function(req, res) {

        var mail = 'root@admin.com';
        var password = '123456@admin';

        User.findOne({mail: mail}).select('_id mail pass').exec(function(err, user) {

            if(user === null) {

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {

                        var user = new User({
                            name: 'Administrador',
                            mail: mail,
                            pass: hash,
                            active: true,
                            type: 'administrator'
                        });

                        user.save(function(err) {
                            if(err) {
                                res.json({status: 'error', errorcode: 2, msg: err});
                            } else {
                                res.json({status: 'success'});
                            }
                        });

                    });
                });

            } else {
                res.json({status: 'error', errorcode: 1, msg: 'first user already created'});
            }

        });

    });

}

