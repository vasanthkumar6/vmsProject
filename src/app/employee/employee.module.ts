import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { EmpprofileComponent } from './empprofile/empprofile.component';
import { EmplogbookComponent } from './emplogbook/emplogbook.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeedashboardComponent, EmpprofileComponent, EmplogbookComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
  ]
})
export class EmployeeModule { }
