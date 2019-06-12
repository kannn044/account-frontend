import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  public token: string;
  public helper = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');
    let isUser = false;
    
    try {
      const decodedToken = this.helper.decodeToken(token);
      const type = decodedToken.type;
      
      if (type === "1") {
        isUser = true;
      } else {
        isUser = false;
      }
    } catch (error) {
      isUser = false;
    }

    if (token) {
      if (this.helper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        if (isUser) {
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