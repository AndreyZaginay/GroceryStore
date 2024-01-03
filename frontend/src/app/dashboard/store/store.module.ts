import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsService } from '@services/products.service';
import { ProductCategoriesService } from '@services/productCategories.service';
import { routes } from './store.routing';
import { StoreComponent } from './store.component';
import { BasketComponent } from './basket/basket.component';
import { DialogComponent } from './basket/dialog/dialog.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [
    StoreComponent,
    BasketComponent,
    DialogComponent,
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductsService,
    ProductCategoriesService
  ]
})
export class StoreModule { }
