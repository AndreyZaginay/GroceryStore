import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./store.component').then(m => m.StoreComponent),
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