import { Component } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: [],
    template: `
        <div class="container">
            <router-outlet></router-outlet>
        </div>        
    `
})
export class ExternalComponent { }