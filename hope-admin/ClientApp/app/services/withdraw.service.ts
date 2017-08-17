import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WithdrawService {


    getAll() {
        return Observable.create((observer:any) => {
            observer.next([
            { time: new Date().getTime() - 1  , userId: 1212, email: "sasha@gmail.com", sum: 200, confirmed: false, rejected: false },
            { time: new Date().getTime() - 2  , userId: 2323, email: "sasha@gmail.com", sum: 300, confirmed: false, rejected: true  },
            { time: new Date().getTime() - 5  , userId: 3434, email: "sasha@gmail.com", sum: 400, confirmed: false, rejected: true  },
            { time: new Date().getTime() - 8  , userId: 4545, email: "sasha@gmail.com", sum: 500, confirmed: true, rejected: false  },
            { time: new Date().getTime() + 2  , userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 1000, userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 200, userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 50 , userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 20 , userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 10 , userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 55 , userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false },
            { time: new Date().getTime() - 80 , userId: 5656, email: "sasha@gmail.com", sum: 600, confirmed: false, rejected: false }
        ]);
            observer.complete();
        });
    }


}