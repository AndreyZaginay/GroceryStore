import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Observable, switchMap } from 'rxjs';  

import { DragAndDropDirective } from '@directives/drag-and-drop.directive';
import { ProductCategory } from '@entities/productCategory';
import { ProductCategoriesService } from '@services/productCategories.service';
import { StorageService } from '@services/firebase/storage.service';
import { ProductsService } from '@services/products.service';

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
    MatRadioModule,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly storageService = inject(StorageService);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();
  productImgUrl: string | undefined;

  get productFormImg(): AbstractControl {
    return this.productForm.get('image') as FormControl;
  }

  @ViewChild('fileInput')
  readonly fileInput!: ElementRef<HTMLInputElement>;

  @ViewChild('fileImg')
  readonly fileImg!: ElementRef<HTMLImageElement>;

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

  displayFileImg() {
    const file = this.productFormImg.value;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { 
      this.fileImg.nativeElement.src = reader.result as string;       
    }
    reader.readAsDataURL(file); 
  }

  setUpFile(file: File) {
    this.productForm.patchValue({ image: file });
    this.displayFileImg();
  }

  initProductForm() {
    this.productForm = new FormGroup({
      category: new FormControl(null, Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl( null, Validators.required),
      measurement: new FormControl(null, Validators.required),  
      image: new FormControl('', Validators.required)
    })
  }

  addProduct() {
    if(this.productForm.invalid) {
      return;
    }
    const { image, category, ...product } = this.productForm.getRawValue();
    const productImg = new File([ image ], `${ product.name }.jpg`);
    this.storageService.uploadProductImg(productImg).pipe(
      switchMap(() => this.productsService.addProduct(category, product))
    ).subscribe({
      complete: () => {
        console.log('done');
      }
    });
  }
}
