import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';


@Injectable()
export class AdminGuard implements CanActivate {
  public token: string;
  public helper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');
    let isAdmin = false;
    
    try {
      const decodedToken = this.helper.decodeToken(token);
      const type = decodedToken.type;
      
      if (type === "2") {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
    } catch (error) {
      isAdmin = false;
    }

    if (token) {
      if (this.helper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        if (isAdmin) {
          return true;
        } else {
          // this.router.navigate(['access-denied']);
          return false;
        }
      }
    } else {
      // this.router.navigate(['login']);
      return false;
    }
  }
}
