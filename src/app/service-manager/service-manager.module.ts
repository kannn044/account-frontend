import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceManagerRoutingModule } from './service-manager-routing.module';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { TechniciansComponent } from './technicians/technicians.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ServiceManagerRoutingModule
  ],
  declarations: [MainComponent, LayoutComponent, TechniciansComponent, CustomersComponent]
})
export class ServiceManagerModule { }
