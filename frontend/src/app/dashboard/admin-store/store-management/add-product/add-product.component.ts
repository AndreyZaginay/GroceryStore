import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';  
import { Router } from '@angular/router';

import { DragAndDropDirective } from '@directives/drag-and-drop.directive';
import { ProductCategory } from '@entities/productCategory';
import { ProductCategoriesService } from '@services/productCategories.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [    
    DragAndDropDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  private readonly productsCategoriesService = inject(ProductCategoriesService);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();

  @ViewChild('fileInput')
  readonly fileInput!: ElementRef<HTMLInputElement>;

  productForm!: FormGroup;

  ngOnInit(): void {
    this.initProductForm();
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
    this.productForm.patchValue({ image: file });
  }

  initProductForm() {
    this.productForm = new FormGroup({
      category: new FormControl(null, Validators.required),
      productName: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      measurement: new FormControl(null, Validators.required),  
      image: new FormControl('', Validators.required)
    })
  }

  addProduct() {
    if(this.productForm.invalid) {
      return;
    }
    console.log(
    this.productForm.getRawValue());
  }
}
