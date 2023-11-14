import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { StoreComponent } from "./store/store.component";

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'store',
                loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'store'
            }
        ]
    },
];
