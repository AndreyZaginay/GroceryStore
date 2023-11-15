import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { authGuard } from "../shared/guards/auth.guard";

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
                path: 'admin-store',
                loadChildren: () => import('./admin-store/admin-store.module').then(m => m.AdminStoreModule),
                canActivate: [authGuard],
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'store'
            }
        ]
    },
];
