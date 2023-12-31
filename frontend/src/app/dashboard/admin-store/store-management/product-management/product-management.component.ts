import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

import { ProductCategory } from '@entities/productCategory';
import { Product, UpdateProduct } from '@entities/product';  
import { ProductCategoriesService } from '@services/productCategories.service';
import { ProductsService } from '@services/products.service';
import { productPriceValidator } from '@validators/productPrice.validator';
import { StorageService } from '@services/firebase/storage.service';
import { MaterialModule } from '@modules/material/material.module';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();

  updateProductForm!: FormGroup;
  products$!: Observable<Product[]>;
  selectedCategory!: string;

  get productFormPrice(): AbstractControl {
    return this.updateProductForm.get('newPrice') as FormControl;
  }
  
  ngOnInit(): void {
    this.initUpdateProductForm();
  }

  getProducts(event: MatSelectChange): void {
    this.products$ = this.productsService.getProducts(event.value);
  }

  deleteProduct(productName: string, productId: string) {
    this.productsService.deleteProduct(this.selectedCategory, productId).pipe(
      switchMap(() => {
        const fileName = `${productName}.jpg`;
        return this.storageService.deleteDocFile(fileName);
      })
    ).subscribe({
      error: (e) => console.log(e.message),
      complete: () => this.router.navigate(['']),
    });
  }
  
  saveChanges(productId: string) {
    if (this.updateProductForm.invalid) {
      return;
    }
    const { newPrice } = this.updateProductForm.getRawValue();
    const updateProduct: UpdateProduct = { price: newPrice };
    this.productsService.updateProduct(this.selectedCategory, productId, updateProduct)
    .subscribe({
      error: (e) => console.log(e.message),
      complete: () => {
        console.log('done');
        this.updateProductForm.reset();
        this.router.navigate(['/dashboard/admin-store']);
      } 
    })
  }
  
  initUpdateProductForm() {
    this.updateProductForm = new FormGroup({
      newPrice: new FormControl(null, [Validators.required, productPriceValidator])
    })
  }
}
