import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import {AppComponent} from './app.component';
import {MsalGuard} from "@azure/msal-angular";
const routes: Routes = [
	{ path: 'user', component: UserComponent , canActivate : [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }






