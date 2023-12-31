import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { authGuard, isAdminGuard } from "@guards/auth.guard";

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
                canActivate: [isAdminGuard],
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
                canActivate: [authGuard]
            },
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'store'
            }
        ]
    },
];
