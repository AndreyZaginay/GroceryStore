import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ProductCategory } from '@entities/productCategory';
import { Product, UpdateProduct } from '@entities/product';  
import { ProductCategoriesService } from '@services/productCategories.service';
import { ProductsService } from '@services/products.service';
import { productPriceValidator } from '@validators/productPrice.validator';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    CdkAccordionModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();

  updateProductForm!: FormGroup;
  products$!: Observable<Product[]>;
  categoryName!: string;

  get productFromPrice(): AbstractControl {
    return this.updateProductForm.get('newPrice') as FormControl;
  }
  
  ngOnInit(): void {
    this.initUpdateProductForm();
  }

  getProducts(event: MatSelectChange): void {
    this.products$ = this.productsService.getProducts(event.value);
  }
  
  saveChanges(productId: string) {
    if (this.updateProductForm.invalid) {
      return;
    }
    const { newPrice } = this.updateProductForm.getRawValue();
    const updateProduct: UpdateProduct = { price: newPrice };
    this.productsService.updateProduct(this.categoryName, productId, updateProduct)
    .subscribe({
      error: (e) => console.log(e.message),
      complete: () => {
        console.log('done');
        this.updateProductForm.reset();
        this.router.navigate(['']);
      }
    })
    
  }
  
  initUpdateProductForm() {
    this.updateProductForm = new FormGroup({
      newPrice: new FormControl(null, [Validators.required, productPriceValidator])
    })
  }
}
