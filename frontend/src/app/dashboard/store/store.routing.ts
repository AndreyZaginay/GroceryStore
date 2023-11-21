import { Routes } from "@angular/router";

import { StoreComponent } from "./store.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        children: [
            {
                path: ':category',
                component: ProductListComponent
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'products'
            }
        ]
    },
];
