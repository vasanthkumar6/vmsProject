//import
const exp=require("express")
//sep
SecurityExpApp=exp.Router();
//export
module.exports=SecurityExpApp;
//
//import mongodb
const mc = require("mongodb").MongoClient
//dburl
dburl = "mongodb://vasanth:vasanthdb@cluster0-shard-00-00-ihpqy.mongodb.net:27017,cluster0-shard-00-01-ihpqy.mongodb.net:27017,cluster0-shard-00-02-ihpqy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

var dbo;
//connect mongoclient with database
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,secuobj)=>{

    if (err) {
        console.log("err in connecting db", err)
    }
    else {
        dbo = secuobj.db("vasanthdb")
        console.log("connected to db")
    }

})

module.exports=dbo