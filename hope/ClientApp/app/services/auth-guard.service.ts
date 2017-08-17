import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


import { AuthService, AuthNavType } from "./auth.service";


@Injectable()
export class AuthGuardService implements CanActivate {


  constructor( private authService: AuthService ) {
  }

  // it useds in routing as guard
  canActivate(): boolean {
    console.log( "AuthGuard#canActivate called", this.authService.loggedIn );
    if (this.authService.loggedIn) {
      return true;
    } else {
      this.authService.nav(AuthNavType.redirectToAuth);
      return false;
    }
  }

  


}