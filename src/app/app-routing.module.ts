import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '',     component: HomeComponent },
  { path: 'admin',     component: CustomerListComponent },
  { path: 'login',     component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
