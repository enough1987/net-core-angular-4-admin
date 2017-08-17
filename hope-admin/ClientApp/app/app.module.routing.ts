import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
  DashboardComponent, MobileConsoleComponent, PurchasesComponent,
  GiftsComponent, ReportsListComponent, WithdrawListComponent,
  LoginComponent, UsersListComponent, ProfileComponent
} from "./index";


import { AuthService } from "./index";


const AppRoutes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'dashboard/mobile-console',
    component: MobileConsoleComponent,
    data: { title: 'Mobile Console' }
  },
  {
    path: 'dashboard/mobile-console/:id',
    component: MobileConsoleComponent,
    data: { title: 'Mobile Console' }
  },
  {
    path: 'dashboard/purchases',
    component: PurchasesComponent,
    data: { title: 'Purchases' }
  },
  {
    path: 'dashboard/purchases/:id',
    component: PurchasesComponent,
    data: { title: 'Purchases' }
  },
  {
    path: 'dashboard/gifts',
    component: GiftsComponent,
    data: { title: 'Gifts' }
  },
  {
    path: 'dashboard/gifts/:id',
    component: GiftsComponent,
    data: { title: 'Gifts' }
  },
  {
    path: 'dashboard/report-list',
    component: ReportsListComponent,
    data: { title: 'Reports List' }
  },
  {
    path: 'dashboard/report-list/:id',
    component: ReportsListComponent,
    data: { title: 'Reports List' }
  },
  {
    path: 'dashboard/withdraw-list',
    component: WithdrawListComponent,
    data: { title: 'Withdraw List' }
  },
  {
    path: 'dashboard/withdraw-list/:id',
    component: WithdrawListComponent,
    data: { title: 'Withdraw List' }
  },
  {
    path: 'dashboard/users-list',
    component: UsersListComponent,
    data: { title: 'Users List' }
  },
  {
    path: 'dashboard/users-list/:id',
    component: UsersListComponent,
    data: { title: 'Users List' }
  },
  {
    path: 'dashboard/profile',
    component: ProfileComponent,
    data: { title: 'Profile' }
  },
  {
    path: 'dashboard/profile/:type',
    component: ProfileComponent,
    data: { title: 'Profile' }
  },
  {
    path: 'dashboard/profile/:type/:id',
    component: ProfileComponent,
    data: { title: 'Profile' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  { path: '**', redirectTo: 'dashboard' }

];

@NgModule({
  imports: [  
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
