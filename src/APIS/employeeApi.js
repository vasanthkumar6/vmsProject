//import
const exp=require("express")
//eep
const EmployeeExpApp=exp.Router()
//export
module.exports=EmployeeExpApp
//import mongodb
const mc = require("mongodb").MongoClient
//dburl
dburl = "mongodb://vasanth:vasanthdb@cluster0-shard-00-00-ihpqy.mongodb.net:27017,cluster0-shard-00-01-ihpqy.mongodb.net:27017,cluster0-shard-00-02-ihpqy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
//bcrypt
const bcrypt=require("bcrypt")
//import multimedia files
const multer=require("multer")
const cloudinary=require("cloudinary")
 const cloudinaryStorage=require("multer-storage-cloudinary")
 cloudinary.config({
    cloud_name:"dmju22jbt",
       api_key:"696396627113615",
    api_secret:"0a_1sjyrGCCZC3m4yoWxbcvvUc0"
 })

 var stg=cloudinaryStorage({
     cloudinary:cloudinary,
     folder:"vmsEmp",
     allowedformats:["jpg","png"],
     filename:function (req,file,cb){
         cb(undefined,file.fieldname+'-'+Date.now())
     }
 })

 var upload=multer({storage:stg})

//connect mongoclient with database
mc.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, adminobj) => {
    if (err) {
        console.log("err in connecting db", err)
    }
    else {
        dbo = adminobj.db("vasanthdb")
        console.log("connected to db")
    }
})

//jwt install and imprt
const jwt=require("jsonwebtoken")



//get handler admin log details
EmployeeExpApp.get("/readlogs/:empid", (req, res) => {
  console.log("params",req.params.empid)
    dbo.collection("logcollection").find({empid:req.params.empid}).toArray((err,empobj) => {
        if (err) {
            console.log("err is in get readall", err)
        }
       
        else {
            console.log("data is",empobj)
            res.send({message:empobj})
        }
    })
})


///////////////////////////////////////////////////////////////////login////////////////////////////////////////////////////////
EmployeeExpApp.post("/employeelogin",(req,res)=>{
    // console.log(req.body)
    dbo.collection("employeecollection").findOne({empid:req.body.empid},(err,empobj)=>{
        // console.log(empobj)
        if(err)
        {
            console.log("err in employeeusername",err)
        }
        else if(empobj==null)
        {
            res.send({message:"invalid username"})
        }
        else
        {
            bcrypt.compare(req.body.password,empobj.password,(err,ismatched)=>{
                if(err)
                {
                    console.log("err in compare pasword",err)
                }
                else if(ismatched == false)
                {
                    res.send({message:"invalid password"})
                }  
            // })
            // dbo.collection("employeecollection").findOne({password:req.body.password},(err,paswobj)=>{
            //     console.log(paswobj)
            //     if(err)
            //     {
            //         console.log("err in employeeusername",err)
            //     }
            //     else if(paswobj==null)
            //     {
            //         res.send({message:"invalid password"})
            //     }
                else{
                    jwt.sign({empid:empobj.empid},"ishh",{expiresIn:60},
                    (err,signedtoken)=>{
                        
                        if(err)
                        {
                          console.log("err in token is",err)
                        }
                        else
                        {                         
                       res.send({message:signedtoken, empid:req.body.empid ,empobj:empobj})   
                         
                        }
                    })
                }
            })
        }
    })
})

/////////////////////////////////profile/////////////////////////////////
EmployeeExpApp.get("/profile/:empid",(req,res)=>{
    
    
    dbo.collection("employeecollection").findOne({empid:req.params.empid},(err,empObj)=>{
        if(err)
        {
            console.log("error in profile find",err)
        }
        else {
            res.send({message:empObj})
        } 
    })
})


//////////////////////////////////propic////////////////////////////////////////

EmployeeExpApp.put("/propic",upload.single("photo"),(req,res)=>{
    
    console.log(req.body.userObj);
    

    req.body=JSON.parse(req.body.userObj)
    req.body.imageurl=req.file.secure_url

    console.log("PRO PIC",req.body)
    console.log(req.file.secure_url)
    dbo.collection("employeecollection").findOne({ vehiclenumber: req.body.vehiclenumber }, (err, empobj) => {
        if (err) {
            console.log("err in post finding emp", err)
        }
        else{
            dbo.collection("employeecollection").updateOne({ vehiclenumber: req.body.vehiclenumber }, {$set:{
                                                     imageurl:req.body.imageurl}},(err, result) => {
                if (err) {
                    console.log("err in post inserting emp", err)
                }
                else {
                    res.send({ message: "uploaded succesfully" })
                }
            })
        }
        // else {
        //     res.send({ message: "vehicle number already registerd" })
        // }
    })
})



















//forgot password
const accountSid = 'AC4d54a2c6c9b4a8d50957982c91ea7ad6';
const authToken = '0b6adee40854ae42a0dd57df76444c84';
const client = require('twilio')(accountSid, authToken);



EmployeeExpApp.post('/forgotpassword',(req,res,next)=>{
    console.log(req.body)
    dbo.collection("employeecollection").findOne({empid:req.body.empid},(err,empobj)=>{
        console.log(empobj)
        if(err){
            next(err)
        }
        else{
            if(empobj===null){
                res.send({message:"user not found"})
            }
            else{
                // res.send({message:empobj})

                jwt.sign({empid:empobj.empid},"ishh",{expiresIn:3600},(err,token)=>{
                    console.log((`+${91}`)+empobj.phonenumber)
                    if(err){
                     next(err);
                    }
                    else{
                        var OTP=Math.floor(Math.random()*9999)+1111;
                        console.log(OTP)
                        
                        client.messages.create({
                            body: OTP,
                            from: +12058988095, // From a valid Twilio number
                            to: (`+${91}`)+empobj.phonenumber,  // Text this number
                          
                        })
                        .then((message) => {
                            // console.log("vasanth");
                            
                            dbo.collection('OTPcollection').insertOne({
                                OTP:OTP,
                                empid:empobj.empid,
                              OTPGeneratedTime:new Date().getTime()+15000
                                
                        },(err,success)=>{
                            if(err){
                                next(err)
                            }
                            else{             
                                // console.log(new Date().getTime()+15000)  
                                        
                                res.send({message:"user found",
                                      token:token,
                                     OTP:OTP,
                                    userName:empobj.empid
                                })
                            }
                        })
                        });

                    }
                    
                })
            }
        }
    })
})

//verify OTP
EmployeeExpApp.post('/verifyotp',(req,res,next)=>{
    console.log(req.body)
    console.log(new Date().getTime())
    var currentTime=new Date().getTime()
    dbo.collection('OTPcollection').findOne({OTP:+req.body.OTP},(err,otpobj)=>{
     
        console.log("otpobj",otpobj)
        if(err){
            next(err)
        }
        else if(otpobj===null){
            res.send({message:"invalidOTP"})
            
        }
        else if(otpobj.OTPGeneratedTime < currentTime){
            console.log( "otptime",otpobj.OTPGeneratedTime )
            console.log("ctime",new Date().getTime())
            res.send({message:"OTP Expired"})
        }
        else{
            
            dbo.collection('OTPcollection').deleteOne({OTP:+req.body.OTP},(err,success)=>{
                if(err){
                    next(err);
                }
                else{
                    // console.log(OTPArray)
                    res.send({"message":"verifiedOTP","time":otpobj.OTPGeneratedTime})
                }
            })
        }
    })
})

//changing password
EmployeeExpApp.put('/changepassword',(req,res,next)=>{
    console.log(req.body)
    bcrypt.hash(req.body.password,6,(err,hashedPassword)=>{
        if (err) {
            next(err)
        } else {
            console.log(hashedPassword)
            dbo.collection("employeecollection").updateOne({empid:req.body.empid},{$set:{
                password:hashedPassword
            }},(err,success)=>{
                if(err){
                    next(err)
                }
                else{
                    res.send({"message":"password changed"})
                }
            }) 
        }
    })
    
})
