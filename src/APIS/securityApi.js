//import
const exp = require("express")
//sep
SecurityExpApp = exp.Router();
//export
module.exports = SecurityExpApp;
//
//import mongodb
const mc= require("mongodb").MongoClient
//dburl
dburl = "mongodb://vasanth:vasanthdb@cluster0-shard-00-00-ihpqy.mongodb.net:27017,cluster0-shard-00-01-ihpqy.mongodb.net:27017,cluster0-shard-00-02-ihpqy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

var dbo;
//connect mongoclient with database
mc.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, secuobj) => {

    if (err) {
        console.log("err in connecting db", err)
    }
    else {
        dbo = secuobj.db("vasanthdb")
        console.log("connected to db")
    }







/////////////////////////////////////////////sec emp////////////////////////////////////////////////////
    //get handler.. read employee data by security
    SecurityExpApp.get("/reademployee", (req, res) => {
    dbo.collection("employeecollection").find().toArray((err, emparray) => {
        if (err) {
            console.log("err is in get reademployee", err)
        }
        else if (emparray == null) {
            res.send({ message: "no data existed" })
        }
        else {
            res.send({ message: emparray })
        }
    })
})


 //////////////////////////////////////logs/////////////////////////////////////////////
    //post  securitylog
    SecurityExpApp.post('/register', (req, res) => {
        // console.log(req.body)
        dbo.collection("employeecollection").findOne({ empid: req.body.empid }, (err, empobj) => {
            if (err) {
                console.log("err in find of postsecurity", err)
            }
            else if (empobj == null) {
                res.send({ message: "Employee not registerd " })
            }
            else {
                req.body.vehiclenumber = empobj.vehiclenumber
                dbo.collection("logcollection").insertOne(req.body, (err, result) => {
                    if (err) {
                        console.log("err in insert of postsecurity", err)
                    }
                    else {
                        res.send({ message: "Data inserted sucessfully" })
                    }
                })
            }
        })
    })

})







//get handler security log details
SecurityExpApp.get("/readlogs", (req, res) => {
    // console.log("data")
    dbo.collection("logcollection").find().toArray((err, emparray) => {
        if (err) {
            console.log("err is in get readlogs", err)
        }
        else if (emparray == null) {
            res.send({ message: "no data existed" })
        }
        else {
            res.send({ message: emparray })
        }
    })
})




//update security log
SecurityExpApp.put("/update", (req, res) => {
    // console.log("data is", req.body)
    dbo.collection("employeecollection").findOne({ empid: req.body.empid}, (err, empobj) => {
        if (err) {
            console.log("error in securitylogbook update", err)
        }
        else if (empobj == null) {
            res.send({ message: "no data found" })
        }
        else {
            dbo.collection("logcollection").updateOne({empid: req.body.empid,date:req.body.date }, { $set: { checkout: req.body.checkout } }, (err, result) => {
                if (err) {
                    console.log("err is in log insert", err)
                }
                else {
                    res.send({ message: "updated sucessfully" })
                }
            })
        }
    })
})




//import require modules
const multer = require('multer');
const xlsxtojson = require("xlsx-to-json-lc");
const xlstojson = require("xls-to-json-lc");


//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
   });
   // upload middleware
   const upload = multer({ storage: storage});
   // convert excel to json route
   SecurityExpApp.post("/uploadlogexcel",upload.single('uploadfile'),(req,res)=>{
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
    exceltojson = xlsxtojson;
    } else {
    exceltojson = xlstojson;
    }
    try {
    exceltojson({
    input: req.file.path, //the same path where we uploaded our file
    output: null, //since we don't need output.json
    lowerCaseHeaders:true
    }, function(err,result){
    if(err) {
    return res.json({error_code:1,err_desc:err, data: null});
    }
    dbo.collection("logcollection").insertMany(result, (err, data) => {
    // console.log(data);
    res.json({error_code:0,err_desc:null, data:
   data["ops"],"message":"log sheet uploaded sucessfully"});
    });
   
    });
    } catch (e){
    res.json({error_code:1,err_desc:"Corupted excel file"});
    }
    });





//////////////////////////////////////////////////////////////////login////////////////////////////////
//jwt install and imprt
const jwt=require("jsonwebtoken")

SecurityExpApp.post("/securitylogin",(req,res)=>{
        dbo.collection("securitycollection").findOne({empid:req.body.empid},(err,secobj)=>{
            if(err)
            {
                console.log("err in securityusername",err)
            }
            else if(secobj==null)
            {
                res.send({message:"invalid username"})
            }
            else
            {
                dbo.collection("securitycollection").findOne({password:secobj.password},(err,paswobj)=>{
                    if(err)
                    {
                        console.log("err in securityusername",err)
                    }
                    else if(paswobj==null)
                    {
                        res.send({message:"invalid password"})
                    }
                    else{
                        jwt.sign({empid:secobj.empid},"ishh",{expiresIn:60},
                        (err,signedtoken)=>{
                            if(err)
                            {
                              console.log("err in token is",err)
                            }
                            else
                            {                         
                           res.send({message:signedtoken, empid:req.body.empid})   
                             
                            }
                        })
                    }
                })
            }
        })
    })
  

////////////////////////profile///////////////////////////////////////////////////////////////////////
SecurityExpApp.get("/securityprofile/:empid",(req,res)=>{
    // console.log(req.params)
    dbo.collection("securitycollection").findOne({empid:req.params.empid},(err,secobj)=>{
        if(err)
        {
            console.log("err in profile findone",err)
        }
        else{
            res.send({message:secobj})
        }
    })
    
})

///////////////////////////////////////////profilepic///////////////////////////////////////////////////////////////////

cloudinary=require("cloudinary")
cloudinarystorage=require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name:"dmju22jbt",
       api_key:"696396627113615",
    api_secret:"0a_1sjyrGCCZC3m4yoWxbcvvUc0"
 })

var stg=cloudinarystorage({
    cloudinary:cloudinary,
    folder:"vmsEmp",
    allowedformats:["jpg","png"],
    filename: function(req,file,cb)
    {
        cb(undefined,file.fieldname+"-"+Date.now())
    }
})

var uploadpro=multer({storage:stg})

SecurityExpApp.put("/propic",uploadpro.single("photo"),(req,res)=>{
    
    console.log(req.body.userObj);
    

   //req.body=JSON.parse(req.body.userobj)
   req.body=JSON.parse(req.body.userObj)
   req.body.imageurl=req.file.secure_url

    console.log("PRO PIC",req.body)
    console.log(req.file.secure_url)
    
            dbo.collection("securitycollection").updateOne({empid:req.body.empid}, {$set:{
                imageurl:req.body.imageurl}},(err, result) => {
                if (err) {
                    console.log("err in post inserting emp", err)
                }
                else {
                    res.send({ message: "uploaded succesfully" })
                }
            })
})

