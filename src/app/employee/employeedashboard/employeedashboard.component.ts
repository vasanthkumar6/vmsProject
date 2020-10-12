import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { LoginserviceService } from 'src/app/loginservice.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {
empid:any;
token:any
  constructor(private gs:GlobalService ,private ar:ActivatedRoute, private ls:LoginserviceService) { }
 
  ngOnInit(): void {
    
    //getting username by paramMap
  this.ar.paramMap.subscribe((param)=>{
    //sending data to login service
    this.gs.empid=param.get("empid")
    this.token=param.get("token")
    console.log(this.gs.empid)
    
  })

  if(this.token)
  {
    this.ls.userloginstatus=true
  }
}
  
}
