//import express
const exp=require("express")
const app=exp();

//parsing
app.use(exp.json())
//port
app.listen(process.env.PORT || 3000);
console.log("server is listening on 3000...")
//imports expapps
AdminApp=require("./src/APIS/adminApi")
EmployeeApp=require("./src/APIS/employeeApi")
SecurityApp=require("./src/APIS/securityApi")

//use them
app.use("/admin",AdminApp)
app.use("/security",SecurityApp)
app.use("/employee",EmployeeApp)

//import path
const path=require("path")

//path
app.use(exp.static(path.join(__dirname,"./dist/vms")))