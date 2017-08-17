import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent, DashboardComponent, GiftsComponent, 
    LoginComponent, MobileConsoleComponent,
    ProfileComponent, PurchasesComponent, ReportsListComponent,
    UsersListComponent, WithdrawListComponent } from './index';
import { BreadcrumbsComponent } from './index';


import { SidebarToggleDirective, SidebarMinimizeDirective, MobileSidebarToggleDirective,
    SidebarOffCanvasCloseDirective, NavDropdownDirective, NavDropdownToggleDirective, 
    AsideToggleDirective } from './index';


import { SafePipe } from './index';


import { AuthService , GiftsService, ReportsService, 
    ResourcesService , UsersService, WithdrawService } from './index';


import { AppRoutingModule } from "./app.module.routing";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
    imports: [
        CommonModule ,
        HttpModule ,
        FormsModule ,
        NgxDatatableModule ,
        AppRoutingModule
    ],   
    providers:    [ 
        AuthService , GiftsService , ReportsService , 
        ResourcesService , UsersService , WithdrawService
    ],
    declarations: [

        SafePipe ,

        SidebarToggleDirective , SidebarMinimizeDirective , MobileSidebarToggleDirective,
        SidebarOffCanvasCloseDirective , NavDropdownDirective , NavDropdownToggleDirective, 
        AsideToggleDirective ,

        BreadcrumbsComponent ,

        AppComponent , DashboardComponent , GiftsComponent , 
        LoginComponent , MobileConsoleComponent ,
        ProfileComponent , PurchasesComponent , ReportsListComponent ,
        UsersListComponent , WithdrawListComponent
        
    ],

})
export class AppModuleShared {
}
