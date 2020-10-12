import { Component } from '@angular/core';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vms';
constructor(public ls:LoginserviceService){}
}
