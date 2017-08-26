import System from './System'
import connector from '../MongoConnector';
connector();

var sys = new System();
sys.setData({name: "register_fields", data: {i_d: "know"}});
sys.store().then(()=>{
    console.log("saved");
}).catch(()=>{
    console.log("save error");
});

sys.getDataByName("register_fields")
.then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
});
