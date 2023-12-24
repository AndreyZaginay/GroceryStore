import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ProductCategory } from '@entities/productCategory';
import { Product } from '@entities/product';  
import { ProductCategoriesService } from '@services/productCategories.service';
import { ProductsService } from '@services/products.service';

@Component({
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    CdkAccordionModule,
    MatInputModule,
    CommonModule
  ],
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly productsService = inject(ProductsService);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();
  products$!: Observable<Product[]>;
  
  getProducts(event: MatSelectChange): void {
    this.products$ = this.productsService.getProducts(event.value);
  }  
}
