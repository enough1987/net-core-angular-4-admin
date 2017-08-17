import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


import { ResourcesService } from "./resources.service";


@Injectable()
export class GiftsService extends ResourcesService {


    constructor(protected http: Http) {
        super(http);
        this.config('http://localhost:3000/api/gifts');
    }

    getAll() {
        return Observable.create((observer:any) => {
            observer.next([
                {
                    id: 1, order: "1", value: "1", 
                    imgUrl: "http://localhost:3000/uploads/2.png",
                    imgBigUrl: "http://localhost:3000/uploads/2.png",
                    type: "cool"
                },
                {
                    id: 2, order: "2", value: "2", 
                    imgUrl: "http://localhost:3000/uploads/2.png",
                    imgBigUrl: "http://localhost:3000/uploads/2.png",
                    type: "cool"
                },
                {
                    id: 3, order: "3", value: "3", 
                    imgUrl: "http://localhost:3000/uploads/2.png",
                    imgBigUrl: "http://localhost:3000/uploads/2.png",
                    type: "cool"
                },
                {
                    id: 4, order: "4", value: "4", 
                    imgUrl: "http://localhost:3000/uploads/2.png",
                    imgBigUrl: "http://localhost:3000/uploads/2.png",
                    type: "cool"
                }
            ]);
            observer.complete();
        });
    }

    getErrors(resource:any) {
        let errors:any = [ ];
        if ( ! resource.id ) errors.id = true;
        if ( resource.order && ! /^[0-9]{1,3}$/.test(resource.order.trim()) ) errors.order = true;
        if ( resource.value && ! /^[0-9]{1,1000}$/.test(resource.value.trim()) ) errors.value = true;
        if ( ! resource.imgUrl ) errors.imgUrl = true;
        if ( ! resource.imgBigUrl ) errors.imgBigUrl = true;
        if ( ! resource.type ) errors.type = true;
        errors.invalide = Object.keys(errors).length;
        console.log(" valid ", errors);
        return errors;
    }

    setProp(resource:any, type:any , value:any ) {
        resource[type] = value;
    }


}