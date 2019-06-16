import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceManagerRoutingModule } from './service-manager-routing.module';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { TechniciansComponent } from './technicians/technicians.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminGuard } from '../admin-guard';
import { UsersService } from './users.service';
import { AlertService } from './alert.service';
import { TitlesComponent } from './titles/titles.component';
import { PositionsComponent } from './positions/positions.component';
import { PeoplesComponent } from './peoples/peoples.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ImportService } from './import.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ServiceManagerRoutingModule,
    MyDatePickerTHModule
  ],
  declarations: [
    MainComponent, 
    LayoutComponent, 
    TechniciansComponent, 
    CustomersComponent, TitlesComponent, PositionsComponent, PeoplesComponent
  ],
  providers: [
    AdminGuard,
    UsersService,
    AlertService,
    ImportService
  ]
})
export class ServiceManagerModule { }
