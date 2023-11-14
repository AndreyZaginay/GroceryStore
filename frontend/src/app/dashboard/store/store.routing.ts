import { Routes } from "@angular/router";

import { StoreComponent } from "./store.component";
import { AboutComponent } from "./about/about.component";
import { ContactsComponent } from "./contacts/contacts.component";

export const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        children: [
            {
                path: 'products',
                loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'contacts',
                component: ContactsComponent
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'products'
            }
        ]
    },
];
