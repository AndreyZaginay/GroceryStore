import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StoreManagementComponent } from './store-management.component';
import { ProductCategoriesService } from '@services/productCategories.service';
import { ProductsService } from '@services/products.service';
import { DragAndDropDirective } from '@directives/drag-and-drop.directive';

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
    MatSelectModule,
    MatFormFieldModule,
    DragAndDropDirective,  
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductCategoriesService,
    ProductsService
  ]
})
export class StoreManagementModule { }
