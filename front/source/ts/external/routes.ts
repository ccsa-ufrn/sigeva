export default [
    { 
        path: 'login', 
        loadChildren: 'app/js/external/authorization/authorization.module#AuthorizationModule' 
    },
    {
        path: 'register', 
        loadChildren: 'app/js/external/authorization/authorization.module#AuthorizationModule'
    },
    {
        path: 'recovery-password', 
        loadChildren: 'app/js/external/authorization/authorization.module#AuthorizationModule'
    },
    {
        path: 'recovery-password/:id', 
        loadChildren: 'app/js/external/authorization/authorization.module#AuthorizationModule'
    }
];