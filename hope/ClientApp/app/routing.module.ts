import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, AuthFormsComponent, MainComponent,
 InfoComponent, HomeComponent, AaaComponent, PayoutComponent } from "./index";


import { AuthGuardService } from "./index";


const AppRoutes: Routes = [
  { path: '', component: AuthComponent, data: { title: 'Fabulive' } },
  { path: 'sign-in', component: AuthFormsComponent, data: { title: 'Sign In' } },
  { path: 'sign-up', component: AuthFormsComponent, data: { title: 'Sign Up' } },
  { path: 'sign-in-forgot', component: AuthFormsComponent, data: { title: 'Forgot Password' } },

  { path: 'info/:id',  component: InfoComponent, data: { title: 'Info' } },

  { path: 'home',  component: HomeComponent, data: { title: 'Home' } },

  { path: 'payout/:id',  component: PayoutComponent, data: { title: 'Payout' } }, // , canActivate: [AuthGuardService]

  { path: 'welcome',  component: MainComponent, data: { title: 'Welcome' } }, // , canActivate: [AuthGuardService]

  { path: 'aaa',  component: AaaComponent, data: { title: 'aaa' } },  
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [  
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }