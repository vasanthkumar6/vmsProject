import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgStyle } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private hc:HttpClient) { }
 role:any;
 userloginstatus:boolean=false;
 loggedInUsername:string;

 
 


  logincheck(a):Observable<any>
  {
     if(this.role=="admin")
     {
    console.log(a)
   return this.hc.post("/admin/adminlogin",a)
     }
    
     if(this.role=="security")
     {
    console.log(a)
   return this.hc.post("/security/securitylogin",a)
     }

     if(this.role=="employee")
     {
      console.log(a)
   return this.hc.post("/employee/employeelogin",a)
     }
    }

     logout()
     {
      localStorage.removeItem("token")
      this.userloginstatus=false;
     
  }
}
