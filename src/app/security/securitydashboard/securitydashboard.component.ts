import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { LoginserviceService } from 'src/app/loginservice.service';

@Component({
  selector: 'app-securitydashboard',
  templateUrl: './securitydashboard.component.html',
  styleUrls: ['./securitydashboard.component.css']
})
export class SecuritydashboardComponent implements OnInit {
 
  constructor(private ar:ActivatedRoute, private gs:GlobalService, private lg : LoginserviceService) { }
//getting params
  ngOnInit(): void {
    this.lg.userloginstatus=true;
     this.ar.paramMap.subscribe((data)=>{
       this.gs.secempid=data.get("empid")
       
     })
  }

}
