import { Injectable } from '@angular/core';


@Injectable()
export class SettingService {

    private static instance: SettingService; // instance of Singleton 
    static originPaypal: string;

    constructor(){
        if ( SettingService.instance ) {
            return SettingService.instance;
        }
        let _window: any = window;
        console.log( _window.location.protocol , _window.location );
        if ( _window.location.hostname == "localhost" ) {
            SettingService.originPaypal = _window.location.protocol + "//" + _window.location.hostname + ':3000';            
        } else {
            SettingService.originPaypal = _window.location.protocol + '//52.58.162.133:3000';
        }
    }

}