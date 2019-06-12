import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { ServiceManagerModule } from './service-manager/service-manager.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AuthModule,
    LoginModule,
    ServiceManagerModule,
    CustomersModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'HOME_URL', useValue: environment.homeUrl },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
