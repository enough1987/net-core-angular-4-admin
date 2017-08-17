import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


import { PaypalService } from "../../index";


@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent {

  id: string = '';
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public paypalService: PaypalService) {
  }

  ngOnInit() {
    const sub = this.activatedRoute.params.subscribe(this.listenParam); 
  }

  private listenParam = (params:any) => {
    this.id = params['id'];
    console.log('ID : ', this.id, " = ", this.paypalService );
    if (this.id == 'login') {
      this.paypalService.getAuthorizeUrl().subscribe((data) => {});
    }
    if (this.id == 'payout') {
      this.paypalService.authorizeCode = this.activatedRoute.snapshot.queryParams["code"];
      console.log( ' ~~--> ', this.paypalService.authorizeCode );
      if (!this.paypalService.authorizeCode) {
        console.log(" test - no authorizeCode ");
        this.router.navigate(['/payout/login']);
      }
      this.paypalService.getUserInfo().subscribe((data) => {
        console.log( this.paypalService.userinfo )
        if (!this.paypalService.userinfo) {
          console.log(" test - no userinfo ");
          this.router.navigate(['/payout/login']);
        }
      });;
    }
    if (this.id == 'success') {

    }
  };
 
  login(amount: string) {
    this.paypalService.getAuthorizeUrl().subscribe((data) => {
      this.paypalService.login(amount);
    });
  }

  payout() {
    console.log(this.paypalService.amount, ' || ', this.paypalService.userinfo);
    if (!this.paypalService.amount || !this.paypalService.userinfo) {
      console.log(" test - no authorizeCode ");
      this.router.navigate(['/payout/login']);
      return;
    }
    this.paypalService.payout().subscribe((data:any) => {
      console.log(data);
      if ( data.links[0] ) {
        console.log( " YES" );
        this.router.navigate(['/payout/init']); 
        //window.location.href =  data.links[0].href;       
      } else {
        console.log( ' NO ' );
      }
    });
  }

  goBack(){
    window.location.href = 'http://www.streamtechltd.com/';
  }


}