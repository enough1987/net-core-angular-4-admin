
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";


import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class TitleService {

    private static instance: TitleService; // instance of Singleton 
   

    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private title: Title) {
        return TitleService.instance ? TitleService.instance : this;
    }

    init(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe((event) => {
                let title = this.getTitle(this.router.routerState, this.router.routerState.root);
                console.log(' title is running : ', title);
                this.title.setTitle(title);
            });
    }

    // collect that title data properties from all child routes
    // there might be a better way but this worked for me
    private getTitle(state:any, parent:any): string {
        var t: string = "";
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            t = parent.snapshot.data.title;
        }

        if (t === "" && state && parent) {
            t = this.getTitle(state, state.firstChild(parent));
        }
        return t;
    }


}