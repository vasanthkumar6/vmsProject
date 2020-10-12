import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private gs:GlobalService) { }
  b:boolean=false
  password:boolean=false
  submitotp:boolean=true

  ngOnInit() {

  
  }
empid:any

  forgotpassword(v)
  {
    console.log(v)
    this.empid=v.empid
     this.gs.forgotpassword(v).subscribe((data)=>{
       if(data["message"]=="user not found"){
         alert(data["message"])
       }
       else{
         alert(data["message"])
        this.submitotp=false
         this.b=true;
       }

     })
  }
  otp(otp){
    console.log(otp)
    this.gs.sendotp(otp).subscribe((data)=>{
   if(data["message"]=="invalidOTP")
   {
     alert(data["message"])
   }
   else if(data["message"]=="OTP Expired")
   {
    alert(data["message"])
   }
   else
   {
    alert(data["message"])
    console.log(data["time"])
    this.password=true;
    this.b=false
   }


       
    })

  }


  newpassword(newp)
  {
    newp.empid=this.empid
    console.log(newp.password1)
    if(newp.password!==newp.password1)
    {
      alert("password doesnot match")
    }
    else
    {
    console.log("vasanth",newp.password)
    this.gs.changepassword(newp).subscribe((data)=>{
      if(data["message"]=="password changed")
      {
             alert("password changed")
      }
      else{
        alert("error in changing password")
      }
    })
  }
    }


timeinsec:any=65
button:any
tim:any
v:any;

ttim=setTimeout(() => {
  this.countdown()
}, 1000);


countdown()
{
  let minutes: string | number= Math.floor(this.timeinsec/60)
  console.log(minutes)
  let seconds: string | number=  this.timeinsec%60
  if(this.timeinsec>0){
    seconds = seconds < 10 ? '0'+seconds : seconds;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    document.getElementById("timer").innerHTML = ` ${minutes}: ${seconds}`;
  
this.timeinsec--;

setTimeout(() => {
  this.countdown()
}, 1000);

}
else{
  
  if(this.timeinsec==0)
  {
    seconds = seconds < 10 ? '0'+seconds : seconds;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    document.getElementById("timer").innerHTML=` ${minutes}:${seconds} `;
    alert("time up")
    // this.button.nativeElement.click();
  }
}
}




}
