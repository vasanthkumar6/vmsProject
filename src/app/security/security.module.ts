import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecuritydashboardComponent } from './securitydashboard/securitydashboard.component';
import { SecempdetailsComponent } from './secempdetails/secempdetails.component';
import { SeclogbookComponent } from './seclogbook/seclogbook.component';
import { SecprofileComponent } from './secprofile/secprofile.component';
import { FormsModule } from '@angular/forms';
import{NgxPaginationModule} from 'ngx-pagination'

// import{ SearchPipe} from "../search.pipe";

import { securitySearchPipe } from './securitysearch.pipe';

@NgModule({
  declarations: [SecuritydashboardComponent, SecempdetailsComponent, SeclogbookComponent, SecprofileComponent, securitySearchPipe],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
NgxPaginationModule
  ]
})
export class SecurityModule { }
