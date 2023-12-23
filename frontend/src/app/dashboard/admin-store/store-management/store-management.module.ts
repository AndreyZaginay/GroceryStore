import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StoreManagementComponent } from './store-management.component';
import { ProductCategoriesService } from '@services/productCategories.service';
import { ProductsService } from '@services/products.service';

const routes: Routes = [
  {
    path: '',
    component: StoreManagementComponent,
    children: [
      {
        path: 'product-management',
        loadComponent: () => import ('./product-management/product-management.component').then(mod => mod.ProductManagementComponent)
      },
      {
        path: 'add-product',
        loadComponent: () => import ('./add-product/add-product.component').then(mod => mod.AddProductComponent)
      },
      {
        path: 'add-category',
        loadComponent: () => import ('./add-category/add-category.component').then(mod => mod.AddCategoryComponent)
      }
    ]
  },
];

@NgModule({
  declarations: [StoreManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductCategoriesService,
    ProductsService
  ]
})
export class StoreManagementModule { }
