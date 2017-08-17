import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


import { ReportsService } from "../../index";


@Component({
    templateUrl: './report-list.component.html'
})
export class ReportsListComponent {


    id: string; // = 'broadcasters';
    rows:any;
    columns:any;


    @ViewChild('myTable') table: any;

    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private reportsService: ReportsService){    
    }


    ngOnInit() {

        const sub = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            if ( this.id == 'broadcasters' ) {
                let rows = this.reportsService.getAllBroadcasters();
                this.rows = rows.sort(this.sort);
                if( this.table ) this.table.bodyHeight = '78vh';
            }  else if ( this.id == 'chatReports' ) {
                let rows = this.reportsService.getAllChatReports();
                this.rows = rows.sort(this.sort);
                if( this.table ) this.table.bodyHeight = '78vh';
            }  else {
                console.log( " id : ", this.id );
                this.router.navigate([ '/dashboard/report-list', 'broadcasters' ]);
            } 
        }); 

    }

    ngAfterViewInit() {
    }

    msToTime(ms:any) {
        let d = new Date("");
        d.setMilliseconds(ms);
        return d.toLocaleTimeString();
    }

    sort = (a:any, b:any) => {
        let minA = this.getMin(a);
        let minB = this.getMin(b);
        if ( minA > minB ) {
            return -1;
        }
        if ( minA < minB ) {
            return 1;
        }
        return 0;
    };

    getMin(arr:any){
        let min = arr[0].time;
        arr.forEach( (el:any) => {
            if( el.time < min ) min = el.time;
        });
        return min;
    }


    toggleExpandRow(row:any) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(e:any) {
        console.log('Detail Toggled', e);
    }

    setReportListId(id:any) {
        //this.id = id;
        this.router.navigate([ '/dashboard/report-list', id ]);
    }


    ban(item:any){
        console.log( "item : ", item );
    }


}