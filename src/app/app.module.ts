import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AppComponent } from './app.component';
import { CustomerService } from './shared/customer.service';
import { environment } from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
import { MaterialsComponent } from './materials/materials.component';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import {HttpClient, HttpClientModule, HttpHandler, HttpHeaders} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    AppComponent, HomeComponent, CustomerListComponent, LoginComponent, MaterialsComponent, AgentLoginComponent
  ],
  imports: [
    BrowserModule,NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,HttpClientModule,
    FormsModule,AppRoutingModule
  ],
  providers: [CustomerService,HttpClient, AngularFireAuth],
  bootstrap: [AppComponent]
})export class AppModule { }
