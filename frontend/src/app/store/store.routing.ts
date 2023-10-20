import { importProvidersFrom } from "@angular/core";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { Routes } from "@angular/router";

import { ProductsService } from "../services/products.service";

export default [
    {
        path: '',
        loadComponent: () => import('./store.component').then(m => m.StoreComponent),
        providers: [
            importProvidersFrom(provideFirestore(() => getFirestore())),
            ProductsService
        ],
        children: [
            {
                path: 'products',
                loadChildren: () => import('./products/products-routing')
            },
            {
                path: 'about',
                loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'contacts',
                loadComponent: () => import('./contacts/contacts.component').then(m => m.ContactsComponent)
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'products'
            }
        ]
    },
] as Routes
