import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ResourcesService {


    filesToUpload: Array<File> = [];
    protected url: string = 'http://localhost:3000/api/purchases';

    constructor(protected http: Http) {
    }

    config(url:any) {
        this.url = url;
    }

    getAll() {
        return Observable.create((observer:any) => {
            observer.next([
                {
                    id: 1, order: "1", discount: "1", packageImage: "1", simple: 1, rare: 1, excellent: 1,
                    imgUrl: "http://localhost:3000/uploads/1.jpg"
                },
                {
                    id: 2, order: "2", discount: "2", packageImage: "2", simple: 2, rare: 2, excellent: 2,
                    imgUrl: "http://localhost:3000/uploads/1.jpg"
                },
                {
                    id: 3, order: "3", discount: "3", packageImage: "3", simple: 3, rare: 3, excellent: 3,
                    imgUrl: "http://localhost:3000/uploads/1.jpg"
                },
                {
                    id: 4, order: "4", discount: "4", packageImage: "4", simple: 4, rare: 4, excellent: 4,
                    imgUrl: "http://localhost:3000/uploads/1.jpg"
                }
            ]);
            observer.complete();
        });
    }

    add(resource:any) {
        return Observable.create((observer:any) => {
            let errors: any = this.getErrors(resource);
            if ( !errors.invalide ) {
                observer.next({ resource: {} });
            } else {
                observer.error(errors);
            }
            observer.complete();
        });
    }

    edit(resource:any) {
        return Observable.create((observer:any) => {
            let errors: any = this.getErrors(resource);
            if ( !errors.invalide ) {
                observer.next({ resource: {} });
            } else {
                observer.error(errors);
            }
            observer.complete();
        });
    }

    remove(resourceId:any) {
        return Observable.create((observer:any) => {
            observer.next({ resourceId: resourceId });
            observer.complete();
        });
    }

    getErrors(resource:any) {
        let errors:any = [ ];;
        if ( !resource.id ) errors.id = true;
        if ( resource.order && ! /^[0-9]{1,3}$/.test(resource.order) ) errors.order = true;
        if ( resource.discount && ! /^[0-9]{1,1000}$/.test(resource.discount) ) errors.discount= true;
        if ( ! /[0-9]/.test(resource.simple) ) errors.simple = true;
        if ( ! /[0-9]/.test(resource.rare) ) errors.rare = true;
        if ( ! /[0-9]/.test(resource.excellent) ) errors.excellent = true;
        if ( !resource.imgUrl ) errors.imgUrl = true;
        errors.invalide = Object.keys(errors).length;
        console.log(" valid ", errors);
        return errors;
    }

    upload(resource:any, resourceProp:any) {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;

        if (!files[0] || !files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            console.log(" file is not image ", files[0] );
            return;
        }

        formData.append("uploads[]", files[0], files[0]['name']);

        this.http.post( this.url + '/upload', formData)
            .map(files => files.json())
            .subscribe(files => {
                console.log('files', files);
                resource[resourceProp] = "http://localhost:3000/uploads/" + files[0].filename;
                console.log( resource[resourceProp] );
            });
    }

    fileChangeEvent(fileInput: any, resource: any, resourceProp: string = 'imgUrl' ) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        let photo = fileInput.target.files[0]['name'];
        console.log(" => ", photo);
        this.upload(resource, resourceProp);
    }

}