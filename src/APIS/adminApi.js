//import express
const exp = require("express")


//aep
AdminExpApp = exp.Router()

//export
module.exports = AdminExpApp
//import mongodb
const mc = require("mongodb").MongoClient
//dburl
dburl = "mongodb://vasanth:vasanthdb@cluster0-shard-00-00-ihpqy.mongodb.net:27017,cluster0-shard-00-01-ihpqy.mongodb.net:27017,cluster0-shard-00-02-ihpqy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

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

//install bcrypt
const bcrypt=require("bcrypt")


//jwt install and imprt
const jwt=require("jsonwebtoken")

//importing midl for emp
var mid1=require("../Middleware/middleware")
//email
const nodemailer=require("nodemailer")

/////////////////////////admin emp/////////////////////////////////////////

//post handler to register a emp

AdminExpApp.post("/insert",mid1, (req, res) => {

    dbo.collection("employeecollection").findOne({ vehiclenumber: req.body.vehiclenumber }, (err, empobj) => {
        if (err) {
            console.log("err in post finding emp", err)
        }
        else if (empobj == null) {
            bcrypt.hash(req.body.password,6,(err,hashedpassword)=>{
                console.log(hashedpassword)
                if(err)
                {
                    console.log("err in hashing",err)
                }
                else{
                             req.body.password=hashedpassword
                             dbo.collection("employeecollection").insertOne(req.body, (err, result) => {
                                if (err) {
                                    console.log("err in post inserting emp", err)
                                }
                                else {
                                    
//nodemailer
   console.log(req.body.email)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `sidekickk${6}@gmail.com`,
      pass: 'fakegmail'
    }
  });
  
  var mailOptions = {
    from: 'sidekickk6@gmail.com',
    to: req.body.email ,
    subject: 'Sending Email using Node.js',
    text: `Hi Smartherd, thank you for your nice Node.js tutorials.
            I will donate 50$ for this course. Please send me payment options.`
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
                                    res.send({ message: "data inserted sucesfully" })
                                }
                            })
                }
            })
          
        }
        else {
            res.send({ message: "vehicle number already registerd" })
        }
    })
})




//get handler employee data
AdminExpApp.get("/reademployee", (req, res) => {
    dbo.collection("employeecollection").find().toArray((err, emparray) => {
        if (err) {
            console.log("err is in get reademployee", err)
        }
        else if (emparray == null) {
            res.send({ message: "no data existed" })
        }
        else {
            res.send({ message: emparray })
            // console.log("src0",emparray)
        }
    })
})


//update handler employeeupdate
AdminExpApp.put("/update", (req, res) => {
    dbo.collection("employeecollection").findOne({ empid: req.body.empid }, (err, empobj) => {
        if (err) {
            console.log("err in update is", err)
        }
        else if (empobj == null) {
            res.send({ message: "employee not existed" })
        }
        else {
            dbo.collection("employeecollection").updateOne({ empid: req.body.empid }, {
                $set: {
                    name: req.body.name,
                    vehicalnumber: req.body.vehicalnumber,
                    password: req.body.password,
                    email: req.body.email, gender: req.body.gender
                }
            }, (err, result) => {

                if (err) {
                    console.log("err in update", err)
                }
                else {
                    res.send({ message: "data updated sucessfully" })
                }

            })
        }
    })
})


//delete data employee data
AdminExpApp.delete("/remove/:i", (req, res) => {
    // console.log(req.params.i);
    dbo.collection("employeecollection").findOne({ empid: req.params.i }, (err, empobj) => {
        if (err) {
            console.log("err in find delete", err)
        }
        else if (empobj == null) {
            res.send({ message: "no employee existed" })
        }
        else {
            dbo.collection("employeecollection").deleteOne(empobj, (err, result) => {
                if (err) {
                    console.log("err in delete", err)
                }
                else {
                    res.send({ message: "data deleted sucessfully" })
                }
            })
        }
    })
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//adminsecurity





//post add security
AdminExpApp.post('/registerSecurity', (req, res) => {
    dbo.collection("securitycollection").findOne({ empid: req.body.empid }, (err, secobj) => {
        if (err) {
            console.log("err in find of postsecurity", err)
        }
        else if (secobj == null) {
            dbo.collection("securitycollection").insertOne(req.body, (err, result) => {
                if (err) {
                    console.log("err in insert of postsecurity", err)
                }
                else {
                    res.send({ message: "Data inserted sucessfully" })
                }
            })
        }
        else {
            res.send({ message: "data existed" })
        }
    })
})



//get handler security data
AdminExpApp.get("/readSecurity", (req, res) => {
    dbo.collection("securitycollection").find().toArray((err, secarray) => {
        if (err) {
            console.log("err is in get readall", err)
        }
        else if (secarray == null) {
            res.send({ message: "no data existed" })
        }
        else {
            res.send({ message: secarray })
        }
    })
})


//update security data
AdminExpApp.put("/updateSecurity", (req, res) => {
    // console.log(req.body)
    dbo.collection("securitycollection").findOne({ empid: req.body.empid }, (err,secobj) => {
        if (err) {
            console.log("err in securityfind of update is", err)
        }
        else if (secobj == null) {

            res.send({message:"No data existed"})                   
        }
        else
        {

            dbo.collection("securitycollection").updateOne({ empid: req.body.empid },{
                $set: {
                    name: req.body.name,
                    password: req.body.password,
                    phonenumber: req.body.phonenumber,
                    email: req.body.email, gender: req.body.gender}},(err,result)=>{

                        if (err) {
                            console.log("err is in securityupdate is", err)
                        }
                        else{
                            res.send({message:"updated sucessfully"})
                        }
                    })
            
        }



    })

})

 
//delete data security data
AdminExpApp.delete("/removeSecurity/:d", (req, res) => {
    // console.log(req.params.d);
    dbo.collection("securitycollection").findOne({ empid: req.params.d }, (err, secobj) => {
        if (err) {
            console.log("err in find delete", err)
        }
        else if (secobj == null) {
            res.send({ message: "no security existed" })
        }
        else {
            dbo.collection("securitycollection").deleteOne(secobj, (err, result) => {
                if (err) {
                    console.log("err in delete", err)
                }
                else {
                    res.send({ message: "data deleted sucessfully" })
                }
            })
        }
    })
})


////////////////////////////// logs//////////////////////////////////


// get handler admin log details
AdminExpApp.get("/readlogs", (req, res) => {
    console.log("vasanh")
    dbo.collection("logcollection").find().toArray((err, logarray) => {
        if (err) {
            console.log("err is in get readall", err)
        }
        else if (logarray == null) {
            res.send({ message: "no data existed" })
        }
        else {
            console.log("data is",logarray)
            res.send({message:logarray})
        }
    })
})

//////////////////////////////admin api//////////////////////////////////////////////////////////////////////////////////

//find login creditibnals
AdminExpApp.post("/adminlogin",(req,res)=>{
      console.log(req.body)
    dbo.collection("admincollection").findOne({empid:req.body.empid},(err,adminobj)=>{
        console.log(adminobj)
        if(err)
        {
            console.log("err in adminlogin findone",err)
        }
        else if(adminobj==null)
        {
            res.send({message:"invalid username"})
        }
        else{
            dbo.collection("admincollection").findOne({password:adminobj.password},(err,paswobj)=>{
                console.log(paswobj)
                if(err)
                {
                    console.log("err in password findone",err)
                }
                else if(paswobj==null)
                {
                    res.send({message:"invalid password"})
                }
                else{
                    // res.send({message:"login sucessfully"})
                      //generate token
                      jwt.sign({empid:adminobj.empid},"ishh",{expiresIn:60},
                      (err,signedtoken)=>{
                          console.log("div",signedtoken)
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

