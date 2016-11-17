let functions = { };

functions.createUsers = function(User, fs, async, cb) {

    fs.readFile('./spec/data/user.json', 'utf8', function (err, data) {
        if (err) throw err;

        let objs = JSON.parse(data);

        async.each(objs, function(obj, callback) {

            let user = new User({
                "name": obj.name,
                "mail": obj.mail,
                "identifier_doc": obj.identifier_doc,
                "password": obj.password,
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

        }, (err) => { if(!err) { console.log(err); } cb(); });
        
    });

};

functions.removeUsers = function(User, fs, async, cb){ 
    User.remove({}, function(){ cb(); });
};


module.exports = functions;