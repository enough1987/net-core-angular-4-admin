import { Component } from '@angular/core';


import { AuthService } from "../../index";



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {


  constructor( private authService: AuthService ) { 
    console.log(" constructor of welcome " );
  }
 
  // https://stackoverflow.com/questions/40214772/file-upload-in-angular-2
  changeFoto(e:any) {
    const observable = this.authService.changeFoto(e);
    if ( observable ) observable.subscribe(
      data => console.log('success'),
      error => console.log(error)
    );
  }
  


}