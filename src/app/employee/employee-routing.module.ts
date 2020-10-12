import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { EmpprofileComponent } from './empprofile/empprofile.component';
import { EmplogbookComponent } from './emplogbook/emplogbook.component';
import { RouteGuard } from '../route.guard';


const routes: Routes = [{path:"employee/:empid/:token",component:EmployeedashboardComponent,
children:[{path:"employeeprofile",component:EmpprofileComponent,canActivate:[RouteGuard]},
{path:"logbook",component:EmplogbookComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
