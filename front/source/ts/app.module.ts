import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';

let Routes = [
    { path: '', component: LoginComponent}
]

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(Routes)
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }