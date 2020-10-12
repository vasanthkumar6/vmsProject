import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecuritydashboardComponent } from './securitydashboard/securitydashboard.component';
import { SecprofileComponent } from './secprofile/secprofile.component';
import { SecempdetailsComponent } from './secempdetails/secempdetails.component';
import { SeclogbookComponent } from './seclogbook/seclogbook.component';


const routes: Routes = [{path:"security/:empid",component:SecuritydashboardComponent,
children:[{path:"Securityprofile",component:SecprofileComponent},
{path:"empdata",component:SecempdetailsComponent},
{path:"logbook",component:SeclogbookComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
