import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthorizationModule } from './authorization/authorization.module';
import { ExternalComponent } from './external.component';
import Routes from './routes';

@NgModule({
    imports: [
        BrowserModule,
        AuthorizationModule,
        RouterModule.forRoot(Routes)
    ],
    declarations: [
        ExternalComponent
    ],
    bootstrap: [ExternalComponent]
})
export class ExternalModule { }