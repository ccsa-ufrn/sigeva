import { Component } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: [],
    template: `

        <!-- Ajeitar -->
        <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
            <a class="navbar-brand" href="#">Eventos Acadêmicos</a>
            <div class="float-xs-right">
                <button class="btn btn-primary" type="button">Inscrever-se</button>
                <button class="btn btn-secondary" type="button">Entrar</button>
            </div>
        </nav>

        <div class="container">
            <router-outlet></router-outlet>
        </div>        
    `
})
export class ExternalComponent { }