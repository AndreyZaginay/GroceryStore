import { Routes } from "@angular/router";

export default [
{
    path: '',
    loadChildren: () => import('./store/store.routing'),
},
{
    path: '*',
    pathMatch: 'full',
    redirectTo: ''
}
] as Routes;