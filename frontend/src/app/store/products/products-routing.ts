import { Routes } from "@angular/router";

export default [
{
    path: '',
    loadComponent: () => import('./products.component').then(m => m.ProductsComponent),
    children: [
        {
            path: ':category',
            loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent)
        },
    ]
},

] as Routes;