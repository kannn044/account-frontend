import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'sm',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'technicians', component: TechniciansComponent },
      { path: 'customers', component: CustomersComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceManagerRoutingModule { }
