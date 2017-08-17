import { Component, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";


import { AuthNavType, AuthTemplateCase } from "../../index";


import { TypeOfModal, ModalsService, AuthService } from "../../index";


class Btn { 
  route: string; 
  text: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {


  tempCase: AuthTemplateCase; // template case
  templateCase = AuthTemplateCase; // copy of enum for template 
  isShowenPass: boolean = false; // used for changing visability of password
  secondViewOfHeader: boolean = false; // used for showing type of view
  isUserModalVisible: boolean = false; // used for show / hide user modal
  typeOfModal = TypeOfModal // copy of enum for modal
  timerId: any;

  @Input() btn: Btn = { route: "/sign-in" , text : "Sign in" };

  @Input() secondView: boolean = true; // if true we have secondView all the time

  @Output() view: EventEmitter<any> = new EventEmitter();

  @ViewChild('header') header:any; 

  @HostListener('window:scroll', ['$event']) onScrollEvent(e:any){
    this.setSecondViewOfHeader();
  } 

  @HostListener('window:resize', ['$event']) onResize(e:any) {
    this.setSecondViewOfHeader();
  }

  @HostListener('window:click', ['$event']) onClick(e:any) {
    let isModalTarget = e.target.classList.contains("modal__target");
    if(!isModalTarget) this.toggleUserModal(false);
  }

  constructor( public authService: AuthService, public modalsService: ModalsService ){
    console.log( " constructor of AppHeaderComponent " ); 
  } 

  ngOnInit() {
  }   

  // change view type
  private setSecondViewOfHeader = ()=> {
    if( this.secondView ) return;
    if ( this.timerId ) clearTimeout(this.timerId);
    this.timerId = setTimeout(()=> {
      let pos = this.header.nativeElement.getBoundingClientRect().top <= -320;
      this.secondViewOfHeader = pos && ( window.innerWidth > 800 ) ;
      this.view.emit(this.secondViewOfHeader);
    }, 50);
  };

  // show / hide modal 
  toggleUserModal(isUserModalVisible:any){
    this.isUserModalVisible = isUserModalVisible;
  }

  // used for showing anather modal 
  openModal(tempCase:any){
    this.toggleUserModal(false);
    this.modalsService.senderOfOpen(tempCase);
  }

 

}