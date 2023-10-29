import { Routes } from "@angular/router";

import { StoreComponent } from "./store.component";
import { AboutComponent } from "./about/about.component";
import { ContactsComponent } from "./contacts/contacts.component";

export const routes: Routes = [
    {
        path: '',
        // loadComponent: () => import('./store.component').then(m => m.StoreComponent),
        component: StoreComponent,
        children: [
            {
                path: 'products',
                loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'about',
                // loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
                component: AboutComponent
            },
            {
                path: 'contacts',
                // loadComponent: () => import('./contacts/contacts.component').then(m => m.ContactsComponent)
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
