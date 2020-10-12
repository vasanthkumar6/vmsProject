import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';
import { GlobalService } from '../global.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    

  constructor(private  router:Router, private ls:LoginserviceService  ) { }

  token:any;

  ngOnInit(): void {
    setTimeout(() => {
      this.ls.logout();
    }, 0);
   
  }
  submitform(value){
    console.log("login credentials",value)
  
    console.log(value)
    if(value.role==""){
      
      alert("please select a role")
    }
    else{

  
    
    this.ls.role=value.role
    
   this.ls.logincheck(value).subscribe((data)=>{
     //role not selcted
     
     //admin
    if(value.role=="admin")
    {
      if(data['message']=="invalid username")
      {
        console.log("admin invalid")
           alert("invalid username")
      }
     else if(data['message']=="invalid password")
     {
         alert("invalid password")
     }
     else {
         alert("login sucessfully")
         //store tokken in local storage
         localStorage.setItem("token",data['message']);

         //update user details in login
         this.ls.loggedInUsername=data['empid']
         this.ls.userloginstatus=true;
        this.router.navigate(['/admin/adminprofile/'])
    }
  }


  //security
   if(value.role=="security")
    {
      // console.log("employeeeeeeeeeeeee")
      // console.log("security")
      if(data['message']=="invalid username")
     {
          alert("invalidusername")
     }
    else if(data['message']=="invalid password")
    {
        alert("invalidpassword")
    }
    else {
      alert("login sucessfully")
      //store tokken in local storage
      localStorage.setItem("token",data['message']);

      //update user details in login
      this.ls.loggedInUsername=data['empid']
      this.ls.userloginstatus=true;
      this.router.navigate([`/security/${data['empid']}/Securityprofile`])
       
    }
    }
  

    //employee
   if(value.role=="employee")
    {
      console.log("employeeeeeeeeeeeee")
     
    if(data['message']=="invalid username")
     {
          alert("invalidusername")
     }
    else if(data['message']=="invalid password")
    {
        alert("invalidpassword")
    }
    else {
      alert("login sucessfully")
      //store tokken in local storage
      localStorage.setItem("token",data['message']);
      this.token=data['message']

      
      //update user details in login   
      this.ls.loggedInUsername=data['empid']
      this.ls.userloginstatus=true,
        this.router.navigate([`/employee/${data['empid']}/${this.token}/employeeprofile`])
    }    
  }
})
    
}  
}


}
