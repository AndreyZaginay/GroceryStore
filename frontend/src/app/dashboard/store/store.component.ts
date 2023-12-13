import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductCategory } from '@entities/productCategory';
import { ProductCategoriesService } from '@services/productCategories.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  private readonly productsCategoriesService = inject(ProductCategoriesService);

  readonly productsCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();

}
