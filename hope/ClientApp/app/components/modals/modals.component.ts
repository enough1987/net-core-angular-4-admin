import { Component, Input, Output, EventEmitter } from '@angular/core';


import { TypeOfModal, AuthNavType } from "../../index";
import { ModalsService, AuthService } from "../../index";



@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {


    @Input() tempCase: TypeOfModal; 

    @Output() openModal: EventEmitter<any> = new EventEmitter();
    @Output() closeModal: EventEmitter<any> = new EventEmitter();

    typeOfModal = TypeOfModal;
    key: string = "";
    isShowenErrors: boolean;
    wasResendCode: boolean;
    serverErrorMsg: string;


    constructor(public authService: AuthService, public modalsService: ModalsService){
      console.log( " constructor of modal ", typeof this.typeOfModal);
    }

    ngOnInit(){
      this.modalsService.listenerOfOpen().subscribe((tempCase: TypeOfModal): void=>{
          this.tempCase = tempCase;
      });
    }

    openModalEvent(tempCase: TypeOfModal): void {
      this.openModal.emit(tempCase);
      this.modalsService.senderOfOpen(tempCase);
    }

    closeModalEvent(): void {
      this.closeModal.emit(this.tempCase);
      this.cleanModalData();
    }

    private cleanModalData(){
      delete this.tempCase;
      delete this.isShowenErrors;
      delete this.wasResendCode;
      delete this.serverErrorMsg;     
    }

    changeKey( key: string ): void {
      let newKey: string = "";
      for (let i:number = 0; i < key.length; i++){
        let c = +key[i];
        if ( typeof c === "number" && c === c ) {
          newKey += key[i];
        };
      }
      console.log(newKey);
      this.key = newKey;
    }

    confirmCode(){
      console.log( " confirmCode ", this.key.length, this.isShowenErrors );
      if( this.key.length == 6 ) {
        this.isShowenErrors = false;
        this.authService.confirmCode(this.key).subscribe(( data )=>{
          console.log( data );
          this.authService.nav(AuthNavType.redirectFromAuth);
          this.closeModalEvent();
        }, (err)=>{
          console.log( err );
          this.serverErrorMsg = err;
        });
      } else {
        this.isShowenErrors = true;
      }
    }

    resendConfirmationCode(){
       console.log( " resendCode " );
        this.authService.resendConfirmationCode().subscribe(( data )=>{
            console.log( data );
            this.wasResendCode = true;
        }, (err)=>{
            console.log( err );
            this.serverErrorMsg = err.message;        
        });     
    }

    cancelModal() {
      if ( this.tempCase == this.typeOfModal.ConfirmSignUp || this.tempCase == this.typeOfModal.Success ) {
        this.authService.nav(AuthNavType.redirectFromAuth);
        this.cleanModalData();
      } else {
        this.closeModalEvent();
      }
    }

    isBackground(){
      return ( this.tempCase === this.typeOfModal.Confirm || 
               this.tempCase === this.typeOfModal.ConfirmSignUp ||
               this.tempCase === this.typeOfModal.Success );
    }



}