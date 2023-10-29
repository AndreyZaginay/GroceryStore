import { Routes } from "@angular/router";

import { ProductsComponent } from "./products.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const productsRouting: Routes = [
{
    path: '',
    // loadComponent: () => import('./products.component').then(m => m.ProductsComponent),
    component: ProductsComponent,
    children: [
        {
            path: ':category',
            // loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent)
            component: ProductListComponent
        },
    ]
},
];