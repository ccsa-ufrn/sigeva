import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

let Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'recovery-password', component: LoginComponent},
    { path: 'recovery-password/:id', component: LoginComponent}
]

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(Routes)
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: []
})
export class AuthorizationModule { }