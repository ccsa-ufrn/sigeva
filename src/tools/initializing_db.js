import System from '../controllers/system/System';
import FieldRequest from '../controllers/fieldRequest/FieldRequest';
import connection from '../controllers/MongoConnector';
import async from 'async';
connection();

/**
 * Script to inialize database with initial configurations for user registration
 *
 * Maradona Morais '2017-08-27 16:05': Create working script
 */

// CREATE FIELDS REQUEST AND ADD TO SYSTEM CONFIGURATIONS
let requests = [
    FieldRequest.createData("name", "Nome completo", "text", false, true),
    FieldRequest.createData("email", "Email", "text", false, true),
    FieldRequest.createData("password", "Senha", "text", false, true)
];

var rf_ids=[];
async.forEachOf(requests, (value, key, callback)=>{
    let fr = new FieldRequest();
    fr.setData(value);
    fr.store().then((_doc)=>{
        rf_ids.push(_doc._id);
        callback();
    });
}, (err)=> {
    let register_fields = {
        name: "register_fields",
        data: rf_ids
    };
    let sys = new System();
    sys.setData(register_fields);
    sys.store().then(()=>{
        console.log("Operation done!");
    })
});
