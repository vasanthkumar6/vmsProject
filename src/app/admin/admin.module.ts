import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdminempComponent } from './adminemp/adminemp.component';
import { AdminsecComponent } from './adminsec/adminsec.component';
import { AdminlogComponent } from './adminlog/adminlog.component';
import { HttpClientModule } from '@angular/common/http';


import { SearchPipe } from '../search.pipe';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AdmindashboardComponent, 
    AdminprofileComponent, 
    AdminempComponent, 
    AdminsecComponent, 
    AdminlogComponent,
    SearchPipe],
 
    imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    // ToastrModule.forRoot()

  ]
})
export class AdminModule { }
