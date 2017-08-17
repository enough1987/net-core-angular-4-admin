import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import {Location} from '@angular/common';


enum InfoTemplateCase {
    Terms,
    Policy,
    Company
}


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

    templateCase = InfoTemplateCase;
    templCase: InfoTemplateCase;

    constructor(private route: ActivatedRoute, private router: Router, 
        private location: Location){
        router.events.filter(event => event instanceof NavigationEnd).subscribe((val) => {
            window.scrollTo(0,0);
            this.setTemplCase();
        });
    }

    ngOnInit(){
        window.scrollTo(0,0);
        this.setTemplCase();
    }
 
    // set template for showing
    private setTemplCase(){
       let id = this.route.snapshot.params['id'];
       console.log( " id ", id );
       if ( id === "company" ) {
            this.templCase = InfoTemplateCase.Company;
       } else if ( id === "terms" ) {
            this.templCase = InfoTemplateCase.Terms;
       } else if ( id === "policy" ) {
            this.templCase = InfoTemplateCase.Policy;
       }
       console.log( id , this.templCase );
    }
  
    // TODO : bug if we went to this page with link, redirect back, do we want redirect to special page?
    navBack(){
        this.location.back();
    }

}