import { Injectable } from '@angular/core';


import { HttpService } from "./http.service";
import { SettingService } from "./settings.service";


@Injectable()
export class PaypalService {

    authorizeCode: string;
    authorizeUrl: string;
    userinfo: any;

    set amount(amount: string) {
        localStorage.setItem("amount", amount);
    }

    get amount() {
        return localStorage.getItem("amount") || "";
    }

    constructor(public httpService: HttpService) {
    }

    getAuthorizeUrl = () => {
        return this.httpService.post(
            SettingService.originPaypal + "/api/paypal/authorizeUrl"
        ).map((data: any) => {
            if (data.authorizeUrl) {
                console.log(" authorizeUrl ", data);
                this.authorizeUrl = data.authorizeUrl;
            }
            return data;
        });
    };

    login = (amount:any) => {
        this.amount = amount;
        console.log(" ====> ", this.authorizeUrl);
        window.location.href = this.authorizeUrl; // + "&amount=" + amount;
    };

    getUserInfo = () => {
        console.log(" code ", this.authorizeCode);
        return this.httpService.post(
            SettingService.originPaypal + "/api/paypal/tokeninfoCreate", {
                code: this.authorizeCode
            }).map((data: any) => {
                console.log(data);
                if (data.userinfo) {
                    this.userinfo = data.userinfo;
                }
                return data;
            });
    };

    payout = () => {
        console.log(" amount ", this.amount);
        return this.httpService.post(
            SettingService.originPaypal + "/api/paypal/payout", {
                amount: this.amount,
                currency: "USD",
                email: this.userinfo ? this.userinfo.email : "",
                description: "payout",
            });
    };



}