let functions = { };

functions.createUsers = function(User, fs, async, cb) {

    var bcrypt = require('bcrypt');

    fs.readFile('./spec/data/user.json', 'utf8', function (err, data) {
        if (err) throw err;

        let objs = JSON.parse(data);

        async.each(objs, function(obj, callback) {

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(obj.password, salt, function(err, hash) {

                    let user = new User({
                        "name": obj.name,
                        "mail": obj.mail,
                        "identifier_doc": obj.identifier_doc,
                        "password": hash,
                        "phone": obj.phone,
                        "institution": obj.institution,
                        "country": obj.country,
                        "lattes_url": obj.lattes_url,
                        "linkedin_url": obj.linkedin_url,
                        "type": obj.type,
                        "active": obj.active
                    });

                    user.save( (err) => { 
                        err ? callback(err) : callback();
                    });

                });
            });
            
        }, (err) => { if(err !== null) { console.log(err); } cb(); });
        
    });

};

functions.removeUsers = function(User, fs, async, cb){ 
    User.remove({}, function(){ cb(); });
};


module.exports = functions;