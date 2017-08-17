
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


import { UsersService } from "../../index";


@Component({
    templateUrl: './users-list.component.html'
})
export class UsersListComponent {

    id:any;
    rows:any;
    users:any;
    isSearch: boolean;


    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private usersService: UsersService) {
    }

    ngOnInit() {

        const sub = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];

            this.setRows();

        });

    }

    setRows() {
        let rows = [];
        if (this.id == 'live') {
            console.log('live');
            this.usersService.getLive().subscribe((data:any) => {
                this.rows = data;
            });
        } else if (this.id == 'banned') {
            console.log('banned');
            this.usersService.getBanned().subscribe((data:any) => {
                this.rows = data;
            });
        } else if (this.id == 'income') {
            console.log('income');
            this.usersService.getIncome().subscribe((data:any) => {
                this.rows = data;
            });
        } else {
            console.log(" id : ", this.id);
            this.router.navigate(['/dashboard/users-list', 'live']);
        }
    }

    setList(id:any) {
        this.router.navigate(['/dashboard/users-list', id]);
    }

    search(value:any) {
        console.log('value');
        if ( !value ) {
            this.isSearch = false;
            this.setRows();
        }
        this.usersService.search(value).subscribe((data:any) => {
            this.isSearch = true;
            this.rows = data;
        });
    }

    ban(row:any) {
        console.log(row);
    }

    warn(row:any) {
        console.log(row);
    }

    unban(row:any) {
        console.log(row);
    }


}