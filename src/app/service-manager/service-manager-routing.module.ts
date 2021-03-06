import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { CustomersComponent } from './customers/customers.component';
// import { AuthGuard } from '../auth-guard.service';
import { AdminGuard } from '../admin-guard';
import { TitlesComponent } from './titles/titles.component';
import { PositionsComponent } from './positions/positions.component';
import { PeoplesComponent } from './peoples/peoples.component';

const routes: Routes = [
  {
    path: 'sm',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'technicians', component: TechniciansComponent },
      { path: 'titles', component: TitlesComponent },
      { path: 'positions', component: PositionsComponent },
      { path: 'peoples', component: PeoplesComponent },
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
