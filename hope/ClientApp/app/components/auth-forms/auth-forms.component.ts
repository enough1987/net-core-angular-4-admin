import { Component, ViewChild, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { AuthNavType, AuthTemplateCase } from "../../index";


import { TypeOfModal, ModalsService, AuthService } from "../../index";


@Component({
  selector: 'app-auth-forms',
  templateUrl: './auth-forms.component.html',
  styleUrls: ['./auth-forms.component.scss']
})
export class AuthFormsComponent {


  private emailPattern: string = "[a-zA-Z_0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}"; // it is used as pattern for email
  private namePattern: string = "[a-zA-Z0-9\x20]{3,30}"; // it is used as pattern for fullname
  private passPattern: string = "^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$"; // it is used as pattern for password

  isShowenErrors: boolean = false; // if it has true we show errors 
  formData: any; // used for form scope and validation
  tempCase: AuthTemplateCase; // template case
  templateCase = AuthTemplateCase; // copy of enum for template 
  isShowenPass: boolean = false; // used for changing visability of password
  subscribeOnUpdates: boolean = true; // used on sign up in checkbox
  serverErrorMsg: string; // show server errors

  constructor( private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    public authService: AuthService, public modalsService: ModalsService ){
    console.log( " constructor of auth forms " ); 
  } 

  ngOnInit(){
    if(this.authService.loggedIn) this.authService.nav(AuthNavType.redirectFromAuth);
    this.setTemplateCase();
    this.initReactiveForm();
  }   

  // setter of templateCase
  private setTemplateCase(){
    let urlFirstSegment = this.activatedRoute.snapshot.url[0];
    let id = urlFirstSegment ? urlFirstSegment.path : undefined;
    if ( id === "sign-in" ) {
      this.tempCase = AuthTemplateCase.SignIn;
    } else if ( id === "sign-up" ) {
      this.tempCase = AuthTemplateCase.SignUp;
    } else if ( id === "sign-in-forgot" ) {
      this.tempCase = AuthTemplateCase.SignInForgot;   
    } else {
      this.authService.nav(AuthNavType.redirectToAuth);
    }
    console.log( " tempCase ", id , this.tempCase) 
  }

  //set FormGroup
  private initReactiveForm() {
    switch(this.tempCase) {
      case this.templateCase.SignIn:
        this.formData = this.formBuilder.group({
          email: ['', [Validators.required, Validators.minLength(6), 
          Validators.maxLength(100), Validators.pattern(this.emailPattern) ]],
          password: ['', [Validators.required, Validators.minLength(6), 
          Validators.maxLength(35) ]]
        });        
        break;
      case this.templateCase.SignUp:
        this.formData = this.formBuilder.group({
          fullName: ['', [Validators.required, Validators.minLength(3), 
          Validators.maxLength(30), Validators.pattern(this.namePattern) ]],
          email: ['', [Validators.required, Validators.minLength(6), 
          Validators.maxLength(100), Validators.pattern(this.emailPattern) ]],
          password: ['', [Validators.required, Validators.minLength(6), 
          Validators.maxLength(35) ]]
        });      
        break;
      case this.templateCase.SignInForgot:
        this.formData = this.formBuilder.group({
          email: ['', [Validators.required, Validators.minLength(6), 
          Validators.maxLength(100), Validators.pattern(this.emailPattern) ]]
        });      
        break;
    }
  }

// it hendles signe up btn
  signIn( ) : void {
    console.log( "signIn" );
    if ( this.formData.valid ) {
      this.isShowenErrors = false; 
      this.authService.signIn({
        email: this.formData.get('email').value,
        password: this.formData.get('password').value
      }).subscribe((data: boolean) => {
        console.log(data);
        this.authService.nav(AuthNavType.redirectFromAuth);
      }, (err)=>{
         console.log( " MSG ", err.message );
         this.isShowenErrors = true; 
         this.serverErrorMsg = err.message;
      });
    } else {
      this.isShowenErrors = true;      
    }
  }

  // it hendles signe up btn
  signUp( ) : void {
    console.log( "signUp" );
    if ( this.formData.valid ) {
      delete this.serverErrorMsg;
      this.isShowenErrors = false; 
      this.authService.signUp({
        fullName: this.formData.get('fullName').value,
        email: this.formData.get('email').value,
        password: this.formData.get('password').value,
        subscribeOnUpdates: this.subscribeOnUpdates        
      }).subscribe((data) => {
        console.log(" DATA ", data);
        this.modalsService.senderOfOpen(TypeOfModal.ConfirmSignUp);
      }, (err)=>{
         console.log( err.message );
         this.isShowenErrors = true; 
         this.serverErrorMsg = err.message;
      });
    } else {
      this.isShowenErrors = true;      
    }
  }

  // it hendles reset pass btn 
  resetPassword() {
    console.log(" reset password ");
    if (this.formData.valid) {
      //this.authService.forgotPassword().subscribe(()=>{
        this.isShowenErrors = false; 
        this.authService.userInfo.email = this.formData.get('email').value;
        this.modalsService.senderOfOpen(TypeOfModal.Success);
      //}, ()=>{
      //  this.isShowenErrors = true;
      //});
    } else {
      this.isShowenErrors = true;
    }
  }

  // show / hide password
  toggleShowenPass(){
    this.isShowenPass = !this.isShowenPass;
  }

  // simple toggle of subscribeOnUpdates
  toggleSubscribeOnUpdates () {
    this.subscribeOnUpdates = !this.subscribeOnUpdates;
  }


}