import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {

    getById(id:any){
        return Observable.create((observer:any) => {
            observer.next({ 
                id: 1212, name: "Sasha", info: " test test", 
                email: "sasha@gmail.com", website: "sasha.com", 
                gender: "men", lacation: "Kiev", graduate: 100, 
                work: "streamteh"
            });
            observer.complete();
        });
    }

    getGiftsbyId(id:any){
        return Observable.create((observer:any) => {
            observer.next([
                { sessionId: 1212, sum: 100, users: [
                    { user: 343434, sum: 20 }, 
                    { user: 222222, sum: 50 }, 
                    { user: 555555, sum: 30 }
                ]},
                { sessionId: 4444, sum: 300, users: [
                    { user: 343434, sum: 120 }, 
                    { user: 222222, sum: 150 }, 
                    { user: 555555, sum: 30 }
                ]},
                { sessionId: 1212, sum: 1500, users: [
                    { user: 343434, sum: 120 }, 
                    { user: 222222, sum: 550 }, 
                    { user: 555555, sum: 830 }
                ]},
                { sessionId: 881212, sum: 500, users: [
                    { user: 555555, sum: 500 }
                ]}            
            ]);
            observer.complete();
        });
    }

    search(value:any){
        return Observable.create((observer:any) => {
            observer.next([
            { live: true, userId: 1212, roomId: 123434, roomTime: 200, viewers: 1003, banned: false, warned: false },
            { live: false, userId: 2323, roomId: 23445, roomTime: 500, viewers: 143, banned: false, warned: false },
            { live: false, userId: 3434, roomId: 4545, roomTime: 700, viewers: 1, banned: true, warned: false },
            { live: false, userId: 4545, roomId: 76767, roomTime: 800, viewers: 100300, banned: true, warned: true },
            { live: true, userId: 5567, roomId: 78787, roomTime: 500, viewers: 45, banned: false, warned: false }
        ]);
            observer.complete();
        });
    }

    getLive() {
        return Observable.create((observer:any) => {
            observer.next([
            { live: true, userId: 1212, roomId: 123434, roomTime: 200, viewers: 1003, banned: false, warned: false },
            { live: true, userId: 2323, roomId: 23445, roomTime: 500, viewers: 143, banned: false, warned: false },
            { live: true, userId: 3434, roomId: 4545, roomTime: 700, viewers: 1, banned: false, warned: false },
            { live: true, userId: 4545, roomId: 76767, roomTime: 800, viewers: 100300, banned: false, warned: true },
            { live: true, userId: 5567, roomId: 78787, roomTime: 500, viewers: 45, banned: false, warned: false }
        ]);
            observer.complete();
        });
    }

    getBanned() {
        return Observable.create((observer:any) => {
            observer.next([
            { userId: 1212, roomId: 2, reason: " second one ", complainant: 'John', banned: true, warned: true },
            { userId: 5567, roomId: 2, reason: " second one ", complainant: 'John', banned: true, warned: false }
        ]);
            observer.complete();
        });
    }

    getIncome() {
        return Observable.create((observer:any) => {
            observer.next([
            { userId: 9888, roomId: 343455, roomTime: 2400, viewers: 10103, banned: false, warned: false, income: 100 },
            { userId: 4444, roomId: 4545, roomTime: 241, viewers: 9999, banned: false, warned: false, income: 58 },
            { userId: 9987, roomId: 676767, roomTime: 5700, viewers: 4655, banned: false, warned: false, income: 0 }
        ]);
            observer.complete();
        });
    }


}