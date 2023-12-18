import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

import { ProductCategory } from '@entities/productCategory';
import { Product } from '@entities/product';  
import { ProductCategoriesService } from '@services/productCategories.service';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrl: './store-management.component.scss',
})
export class StoreManagementComponent implements OnInit {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly productsService = inject(ProductsService);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();
  products$!: Observable<Product[]>;
  file: File | undefined;

  @ViewChild('fileInput')
  readonly fileInput!: ElementRef<HTMLInputElement>

  ngOnInit(): void {
  }

  getProducts(event: MatSelectChange): void {
    this.products$ = this.productsService.getProducts(event.value);
  }  

  selectFile(e: Event) {
    this.setUpFile((e.target as HTMLInputElement).files![0]);
  }

  dragFile(file: File) {
    const dataTransfer = new DataTransfer;
    dataTransfer.items.add(file);
    this.fileInput.nativeElement.files = dataTransfer.files;
    this.setUpFile(file);
  }

  setUpFile(file: File) {
    this.file = file;    
  }
}
