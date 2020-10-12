import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/loginservice.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private lg:LoginserviceService) { }

  ngOnInit(): void {
    this.lg.userloginstatus=true;
    
  }
 

}
