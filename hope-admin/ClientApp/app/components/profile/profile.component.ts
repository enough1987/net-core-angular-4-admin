
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


import { UsersService } from "../../index";


@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent {

    id:any;
    type:any;
    existData:any;
    info:any;
    history:any;

    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private usersService: UsersService) {
    }

    ngOnInit() {

        const sub = this.activatedRoute.params.subscribe((params) => {

            this.id = params['id'];
            this.type = params['type'];

            if ( !this.type ) this.router.navigate(['/dashboard/profile/info']);

            if ( this.id ) {
                this.setData();
            }
        });

    }

    setData(){
        let rows = [];
        delete this.existData;
        delete this.info;
        delete this.history;
        if (this.type == 'info') {
            console.log('info');
            this.usersService.getById(this.id).subscribe((data:any) => {
                this.info = data;
                console.log( this.info );
                if (this.info.id ) this.existData = true;
            });
        } else if (this.type == 'history') {  
            console.log('history');
            this.usersService.getGiftsbyId(this.id).subscribe((data:any) => {
                this.history = data;
                console.log( this.history );
                if ( this.history.length ) this.existData = true;
            });
        } else {
            this.setType('info');
        }
    }

    setType(type:any) {
        console.log( " type ", type );
        if ( this.id ) this.router.navigate(['/dashboard/profile/' + type, this.id ]);
        if ( ! this.id ) this.router.navigate(['/dashboard/profile/' + type ]);
    }

    search(id:any){

        if ( this.type && id ) this.router.navigate(['/dashboard/profile/' + this.type , id ]);
        if ( this.type && !id ) this.router.navigate(['/dashboard/profile/' + this.type ]);
        if ( ! this.type && id ) this.router.navigate(['/dashboard/profile/info' , id ]);
        if ( ! this.type && !id ) this.router.navigate(['/dashboard/profile/info' ]);

    }

    edit(el:any){
        el.disabled = !el.disabled;
        console.log( el );
    }

    remove(prop:any){
       console.log( prop );
       this.info[prop] = "";
    }

    toggleExpandRow(row:any) {
        console.log('Toggled Expand Row!', row);
        row.$$expanded = !row.$$expanded;
    }


}