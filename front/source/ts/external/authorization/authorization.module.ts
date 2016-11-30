import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

let Routes = [
    { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(Routes)
    ],
    declarations: [
        LoginComponent
    ],
    bootstrap: []
})
export class AuthorizationModule { }