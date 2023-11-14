import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';

@NgModule({
  declarations: [DashboardComponent, AdminStoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class DashboardModule { }
