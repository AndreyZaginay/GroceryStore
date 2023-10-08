import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./store.component').then(m => m.StoreComponent),
        children: [
            {
                path: 'products',
                loadComponent: () => import('./products-list/products-list.component').then(m => m.ProductsListComponent)
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'products'
            }
        ]
    },
] as Routes