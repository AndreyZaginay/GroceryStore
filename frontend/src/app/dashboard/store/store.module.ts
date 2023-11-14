import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductsService } from '../../services/products.service';
import { routes } from './store.routing';
import { StoreComponent } from './store.component';
import { BasketComponent } from './basket/basket.component';
import { DialogComponent } from './basket/dialog/dialog.component';

@NgModule({
  declarations: [
    StoreComponent,
    BasketComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductsService
  ]
})
export class StoreModule { }
