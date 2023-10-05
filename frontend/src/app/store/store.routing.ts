import { CanMatchFn, Router, Routes } from "@angular/router";
import { inject } from "@angular/core";

const canMatchBasket: CanMatchFn = () => {
    const router = inject(Router);
    const isLogIn = false;
    return true;
}

export default [
    {
        path: '',
        loadComponent: () => import('./store.component').then(m => m.StoreComponent),
        children: [
            {
                path: 'basket',
                loadComponent: () => import('./basket/basket.component').then(m => m.BasketComponent),
                canMatch: [canMatchBasket]
            },
            {
                path: 'productList',
                loadComponent: () => import('./products-list/products-list.component').then(m => m.ProductsListComponent)
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'productList'
            }
        ]
    },
] as Routes