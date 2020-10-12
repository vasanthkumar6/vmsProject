import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdminempComponent } from './adminemp/adminemp.component';
import { AdminsecComponent } from './adminsec/adminsec.component';
import { AdminlogComponent } from './adminlog/adminlog.component';


const routes: Routes = [{path:"admin",component:AdmindashboardComponent,
children:[{path:"adminprofile",component:AdminprofileComponent},
{path:"employee",component:AdminempComponent},
{path:"security",component:AdminsecComponent},
{path:"logbook",component:AdminlogComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
