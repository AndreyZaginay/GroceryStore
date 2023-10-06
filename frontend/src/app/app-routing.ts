import { Routes } from "@angular/router";

export default [
    // {
    //     path: 'store',
    //     loadComponent: () => import('./store/store.component').then(m => m.StoreComponent)
    // },
    // {
    //     path: 'users',
    //     loadChildren: () => import('./users/users-routing') 
    // },
{
    path: '',
    loadChildren: () => import('./store/store.routing') 
},
{
    path: '*',
    pathMatch: 'full',
    redirectTo: ''
}
] as Routes;