import { Injectable } from '@angular/core';


@Injectable()
export class ReportsService {


    getAllBroadcasters() {
        let rows: any = [
            [
                { userId: 1, roomId: 1, reason: " first one " , complainant: 'Bob', time: new Date().getTime() - 2000 },
                { userId: 1, roomId: 2, reason: " second one ", complainant: 'John', time: new Date().getTime() - 1000 },
                { userId: 1, roomId: 3, reason: " second one ", complainant: 'John', time: new Date().getTime() - 5000 }
            ],
            [
                { userId: 2, roomId: 2, reason: " second one ", complainant: 'John', time: new Date().getTime() - 200 },
                { userId: 2, roomId: 3, reason: " second one ", complainant: 'John', time: new Date().getTime() - 400 , banned: true },
                { userId: 2, roomId: 2, reason: " second one ", complainant: 'John', time: new Date().getTime() - 100 },
                { userId: 2, roomId: 4, reason: " second one ", complainant: 'John', time: new Date().getTime() - 300 },
                { userId: 2, roomId: 2, reason: " second one ", complainant: 'John', time: new Date().getTime() - 50 },
                { userId: 2, roomId: 1, reason: " second one ", complainant: 'John', time: new Date().getTime() - 80 },
                { userId: 2, roomId: 2, reason: " second one ", complainant: 'John', time: new Date().getTime() - 1 }
            ]
        ];
        for (let i = 2; i < 200; i++) {
            rows[i] = [
                { userId: i, roomId: i, reason: 2 * i, complainant: 1.5 * i, time: new Date().getTime() - 10000 }
            ];
        };
        return rows;
    }

    getAllChatReports() {
        let rows: any = [
            [
                { userId: "user_id125456", roomId: "room_id12345", message: "first one first one first one first one first one" ,
                 complainant: 'user_id123456', time: new Date().getTime() - 1 },
                { userId: 1, roomId: 2, message: " second one ", complainant: 'John', time: new Date().getTime() - 1},
                { userId: 1, roomId: 3, message: " second one ", complainant: 'John', time: new Date().getTime() - 2 }
            ],
            [
                { userId: 2, roomId: 2, message: " second one ", complainant: 'John', time: new Date().getTime() - 55},
                { userId: 2, roomId: 3, message: " second one ", complainant: 'John', time: new Date().getTime(), banned: true },
                { userId: 2, roomId: 2, message: " second one ", complainant: 'John', time: new Date().getTime() - 5 },
                { userId: 2, roomId: 4, message: " second one ", complainant: 'John', time: new Date().getTime() - 2 },
                { userId: 2, roomId: 2, message: " second one ", complainant: 'John', time: new Date().getTime() - 3 },
                { userId: 2, roomId: 1, message: " second one ", complainant: 'John', time: new Date().getTime()  - 30 },
                { userId: 2, roomId: 2, message: " second one ", complainant: 'John', time: new Date().getTime() - 20 }
            ]
        ];
        for (let i = 2; i < 200; i++) {
            rows[i] = [
                { userId: i, roomId: i, message: 2 * i, complainant: 1.5 * i, time: new Date().getTime() - 20000 }
            ];
        };
        return rows;
    }

}
