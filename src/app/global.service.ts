import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnInit{

  
 
  ngOnInit():void{
    
  }
 
  constructor(private hc:HttpClient) { }

////////////////////////////////admin emp////////////////////////////////////////////////////////

//post data
  senddata(x):Observable<any>
  {
    //console.log(x)
  return this.hc.post("/admin/insert",x)
  }


//read data of employee admin
  getdata():Observable<any>
  {
   return this.hc.get("/admin/reademployee") 
  }
//update data
  updatedata(update):Observable<any>
  {
    console.log(update)
    return this.hc.put("/admin/update",update)
  }
//delete data
  deletedata(i):Observable<any>
  {
    console.log(i)
    return this.hc.delete(`/admin/remove/${i}`)
  }

 
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                             //admin security
                                                /////////////////////////////////////////////////////////////////////////////////////////


//post security data
  senddata1(input):Observable<any>
  {
    console.log(input)
    return this.hc.post("/admin/registerSecurity",input)
    }
  
//get security data
getdata1():Observable<any>
{
  return this.hc.get("/admin/readSecurity")
}

//read security data
updatedata1(input)
{
  return this.hc.put("/admin/updateSecurity",input)
}

//delete security data
deletedata1(d)
{
  console.log(d)
  return this.hc.delete(`/admin/removeSecurity/${d}`) 
}





///////////////////////////////////////
                                      //sec emp
                                      //////////////////////////////////////////////////////

//get employee details by security

securityEmpData():Observable<any>
{
 return this.hc.get("/security/reademployee") 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                 //sec EmpLog
                                                                   //////////////////////////////////////////////////////////////////////
//post logdata by security
 senddatalog(input):Observable<any>
 {
  //  console.log(input)
   return this.hc.post("/security/register",input)
 }


//  getlog(input):Observable<any>
//  {
//    console.log(input)
//    return this.hc.post("/security/register",input)
//  }

//get log data by security
securityGetLogData():Observable<any>
 {
  // console.log("data")
   
   return  this.hc.get("/security/readlogs")
 }

 //update log data by security
 updatelogdata(x):Observable<any>
 {
  //  console.log(x)
   return this.hc.put("/security/update",x)
 }
//////////////////////////////////////////////////////////////////////////////////////////////
                                                              //admin emp log book
                                                              /////////////////////////////////////////////////////
adminGetLogData():Observable<any>
{
  console.log("A")
  return this.hc.get("/admin/readlogs")
}


////////////////////////////////////////////////////////////////////////upload excel

 setlog(x):Observable<any>{
   console.log(x);
  return this.hc.post("/security/uploadlogexcel",x)
  }





//////////////////////////////emp log book///////////////////////////////////////////////


getEMPLog(empid):Observable<any>{
   console.log(this.empid)
 return this.hc.get(`/employee/readlogs/${empid}`)
 }

 /////////////////////////////////////////////////////profiles//////////////////////////////////////////////
 empid:any; 
 secempid:any;

 //emp params
 sendempparams(){
  return this.empid;
}


 profile(empid)
 {
  //  console.log(empid)
   return this.hc.get("/employee/profile/"+empid)
 }



 //secemp params
sendsecparams(){
  return this.secempid;
}


secprofile(empid)
 {
  //  console.log(empid)
   return this.hc.get("/security/securityprofile/"+empid)
 }


////////////////////////////////////////profile pic security and employee///////////////////////////////
emppropic(fd):Observable<any>
{
  console.log(fd)
 return this.hc.put("/employee/propic",fd)
}

secpropic(fd):Observable<any>
{
  console.log(fd)
 return this.hc.put("/security/propic",fd)
}



///////////////////////////forgot password
forgotpassword(v):Observable<any>
{

  return this.hc.post("/employee/forgotpassword",v)
}

sendotp(otp):Observable<any>
{
  return this.hc.post("/employee/verifyotp",otp)
}

changepassword(newp):Observable<any>
{
 return this.hc.put("/employee/changepassword",newp)
}

}

