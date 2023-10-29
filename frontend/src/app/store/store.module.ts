import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { routes } from './store.routing';
import { StoreComponent } from './store.component';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  declarations: [
    StoreComponent,
    BasketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductsService
  ]
})
export class StoreModule { }
