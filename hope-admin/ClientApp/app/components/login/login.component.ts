import { Component } from '@angular/core';


import { AuthService } from "../../index";


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginForm: { username: string, password: string } = { username: "", password: "" };

  constructor(private authService: AuthService) { }

  login(loginForm:any){
    if( !loginForm.username || !loginForm.password ) {
      console.log( " no login for you " );
    } else {
      this.authService.login(loginForm);
    }
  }

}
