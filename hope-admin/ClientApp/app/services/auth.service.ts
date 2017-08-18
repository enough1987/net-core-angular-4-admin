import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';



@Injectable()
export class AuthService implements CanActivate {

  static isLogedIn: boolean = true;


  constructor( private router: Router ) {
  }

  // it useds in routing as guard
  canActivate(): boolean {
    let _window: any = window;
    console.log( _window.location );
    console.log( "AuthGuard#canActivate called ", AuthService.isLogedIn );
    if( !AuthService.isLogedIn ) {
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      //_window.location.href = _window.location.origin + '/login';
      return false;
    } else {
      return true;
    }
  }

  login( loginForm: { username: string, password: string } ): boolean {
    if ( loginForm.username == "up" && loginForm.password == "up" ) {
      console.log( " loginForm ", loginForm );
      AuthService.isLogedIn = true;
      this.router.navigate(['/']);
      //window.location.href = window.location.origin + '/admin';
      return true;
    }  else {
      console.log( " NO loginForm ", loginForm );
      return false;
    }
  }

  


}