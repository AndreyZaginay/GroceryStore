import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminStoreComponent } from './admin-store.component';

const routes: Routes = [
  {
    path: '',
    component: AdminStoreComponent
  }
];

@NgModule({
  declarations: [AdminStoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminStoreModule { }
