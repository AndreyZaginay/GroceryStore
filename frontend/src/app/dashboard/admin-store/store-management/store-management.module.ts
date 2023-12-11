import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StoreManagementComponent } from './store-management.component';

const routes: Routes = [
  {
    path: '',
    component: StoreManagementComponent,
  },
];

@NgModule({
  declarations: [StoreManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreManagementModule { }
