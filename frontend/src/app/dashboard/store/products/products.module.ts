import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { productsRouting } from './products-routing';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductsComponent, 
    ProductCardComponent
],
  imports: [
    CommonModule,
    RouterModule.forChild(productsRouting),
  ]
})
export class ProductsModule { }