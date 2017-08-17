import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


import {
  CognitoUserPool, CognitoUserAttribute, CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import * as AWS from "aws-sdk";


import { HttpService } from "./http.service";


export enum AuthNavType {
  redirectToAuth,
  redirectFromAuth
}

export enum AuthTemplateCase {
  Base,
  SignUp,
  SignIn,  
  SignInForgot
}

export class SignIn {
  email: string;
  password: string;
}

export class SignUp {
  fullName: string;
  email: string;
  password: string;
  subscribeOnUpdates: boolean;
}

export class UserInfo {

  stripeId: string;
  stripeToken: string;
  stripeCountry: string;
  stripeCurrency: string;
  
  registered: boolean;
  username: string;
  password: string;
  email: string;
  email_verified: boolean;
  constructor(registered: boolean, username: string, password: string, email: string, email_verified?: boolean) {
    this.registered = registered;
    this.username = username;
    this.password = password;
    this.email = email;
    if (email_verified) this.email_verified = email_verified;
  }
}


@Injectable()
export class AuthService {

  private cognitoUser: any;  // CognitoUser;
  private userPool: any; // CognitoUserPool;

  private redirectToAuth: string = ""; // it uses for redirection to auth
  private redirectFromAuth: string = ""; // it uses for redirection from auth

  // AWS variebles starts

  region: string = "eu-central-1";
  userPoolId: string = "eu-central-1_0VWSoKhex";
  clientId: string = "7cjjqbsn3gfcr2bv732kkqovge";
  identitypoolid: string = "eu-central-1:ab39fcdf-e476-45d0-89fd-3c974a48e36a";
  identityProvider: string = "cognito-idp." + this.region + ".amazonaws.com/" + this.userPoolId;

  // AWS variebles ends

  userInfo: UserInfo = new UserInfo(false, "", "", "", false);


  constructor(private router: Router, private httpService: HttpService) {
    this.onInit()
  }

  private onInit() {
    AWS.config.region = this.region;
    AWS.config.update({ accessKeyId: 'mock', secretAccessKey: 'mock' });
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId, // Your user pool id here
      ClientId: this.clientId // Your client id here
    });
    console.log(" USERPOOL => ", this.userPool);
  }

  // it is getter for isLoggedIn
  get loggedIn(): boolean {
    return !!this.userInfo.username;
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  resetUserInfo() {
    this.userInfo = new UserInfo(false, "", "", "", false);
    localStorage.removeItem("userInfo");
  }

  // navigation to/from auth page group
  nav(authNavType: AuthNavType): void {
    console.log(" nav ", authNavType);
    if (authNavType === AuthNavType.redirectToAuth) this.router.navigate([this.redirectToAuth]);
    if (authNavType === AuthNavType.redirectFromAuth) this.router.navigate([this.redirectFromAuth]);
  }

  private getOptionsForCognitoIdentityCredentials(res:any) {
    let options: any = {};
    options['IdentityPoolId'] = this.identitypoolid;
    options['Logins'] = {};
    options['Logins'][this.identityProvider] = res.getIdToken().getJwtToken();
    return options;
  }

  // it uses for start session
  retrieveCurrentUser(observer?: any, result?: any): void {
    console.log(" RETRIVE CURRENT  USER ");
    if (!this.cognitoUser) this.cognitoUser = this.userPool.getCurrentUser();
    console.log(" cognitoUser ", this.cognitoUser);
    if (this.cognitoUser != null) {
      this.cognitoUser.getSession((err:any, session:any) => {
        if (err) {
          console.error(err);
          if (observer) observer.next(result);
          return;
        }
        console.log('session validity: ' + session.isValid());
        // NOTE: getSession must be called to authenticate user before calling getUserAttributes
        this.cognitoUser.getUserAttributes((err:any, attributes:any) => {
          if (err) {
            console.log(" ERR ", err);
            if (observer) observer.next(result);
          } else {
            console.log(" attributes ", attributes);
            let obj: any = {};
            for (let i = 0; i < attributes.length; i++) {
              obj[attributes[i].getName()] = attributes[i].getValue();
            }
            this.setUserInfo(new UserInfo(true, this.cognitoUser.getUsername(), "", obj.email, obj.email_verified));
          }
          console.log(" userInfo ", this.userInfo);
          if (observer) observer.next();
        });
        let options = this.getOptionsForCognitoIdentityCredentials(session);
        AWS.config.credentials = new AWS.CognitoIdentityCredentials(options);
      });
    }
  }

  // it logins in user
  signIn(formData: SignIn): Observable<any> {
    console.log(" SIGN IN ", formData);
    let sub = new Observable(observer => {
      this.cognitoUser = new CognitoUser({
        Username: formData.email,
        Pool: this.userPool
      });
      console.log(" cognitoUser : ", this.cognitoUser);
      let authenticationDetails = new AuthenticationDetails({
        Username: formData.email,
        Password: formData.password
      });
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result:any) => {
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          let options = this.getOptionsForCognitoIdentityCredentials(result);
          AWS.config.credentials = new AWS.CognitoIdentityCredentials(options);
          this.setUserInfo(new UserInfo(true, this.cognitoUser.getUsername(), formData.password, formData.email));
          this.retrieveCurrentUser(observer, result);
        },
        onFailure: (err:any) => {
          return observer.error(err);
        },

      });
    });
    return sub;
  }

  // it signs up user
  signUp(formData: SignUp): Observable<any> {
    console.log(" SIGN UP ", formData);
    let sub = new Observable(observer => {
      let attributeList = [];
      let email = new CognitoUserAttribute({
        Name: 'email',
        Value: formData.email
      });
      attributeList.push(email);
      // formData.fullName
      let username: string = formData.fullName.replace(/\s/g, "");
      console.log(" username ", username);
      this.userPool.signUp(username, formData.password, attributeList, null, (err:any, result:any) => {
        if (err) return observer.error(err);
        this.cognitoUser = result.user;
        console.log(" this.cognitoUser : ", this.cognitoUser);
        this.setUserInfo(new UserInfo(true, this.cognitoUser.getUsername(), formData.password, formData.email, false));
        observer.next(result);
      });
    });
    return sub;
  }

  // send code to confirm
  confirmCode(code:any): Observable<any> {
    console.log(" CONFIRM CODE ");
    let sub = new Observable(observer => {
      if (!this.cognitoUser) this.cognitoUser = this.userPool.getCurrentUser();
      this.cognitoUser.confirmRegistration(code, true, (err:any, result:any) => {
        if (err) return observer.error(err);
        console.log('cognitoUser.confirmRegistration result: ', result);
        this.signIn({ email: this.userInfo.email, password: this.userInfo.password }).subscribe(() => {
          observer.next(result);
        });
      });
    });
    return sub;
  }

  resendConfirmationCode(): Observable<any> {
    console.log(" RESEND CONFIRM CODE ");
    let sub = new Observable(observer => {
      if (!this.cognitoUser) this.cognitoUser = this.userPool.getCurrentUser();
      this.cognitoUser.resendConfirmationCode((err:any, result:any) => {
        if (err) return observer.error(err);
        console.log('cognitoUser.resendConfirmationCode result: ', result);
        observer.next(result);
      });
    });
    return sub;
  }

  forgotPassword(): Observable<any> {
    console.log(" FORGOT PASSWORD ");
    let sub = new Observable(observer => {
      if (!this.cognitoUser) this.cognitoUser = this.userPool.getCurrentUser();
      let cognitoUser: any = this.cognitoUser;
      if( cognitoUser ) cognitoUser.forgotPassword({
        onSuccess: function (result:any) {
          console.log('call result: ' + result);
          observer.next(result);
        },
        onFailure: function (err:any) {
          console.error(err);
          observer.error(err);
        },
        inputVerificationCode() {
          var verificationCode = prompt('Please input verification code ', '');
          var newPassword = prompt('Enter new password ', '');
          cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
      });
    });
    return sub;
  }

  // it logins out user
  signOut(): void {
    this.cognitoUser = this.userPool.getCurrentUser();
    this.cognitoUser.signOut();
    this.resetUserInfo();
    this.nav(AuthNavType.redirectToAuth);
  }


  // type of sign in ( with Facebook )
  signInWithFb(): void {

  }

  // type of sign up ( with Facebook )
  signUpWithFb(): void {

  }

  // https://stackoverflow.com/questions/40214772/file-upload-in-angular-2
  changeFoto(e:any) {
    let fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.httpService.post("../../assets/test.json", formData, headers);
    }
  }

}