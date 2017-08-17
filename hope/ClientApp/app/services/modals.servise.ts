
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Rx";


export enum TypeOfModal {
  Profile,
  Confirm,
  ConfirmSignUp,
  Success
}


@Injectable()
export class ModalsService {

    static instance: ModalsService;

    private _subject = new Subject();

    constructor() {
        return ModalsService.instance = ModalsService.instance || this;
    }

    listenerOfOpen() {
        return this._subject.asObservable();
    }

    senderOfOpen(item:any):void {
        this._subject.next(item);
    }




}