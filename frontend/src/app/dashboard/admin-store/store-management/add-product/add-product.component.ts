import { CommonModule } from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild, inject, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged, EMPTY, filter,
  from,
  Observable,
  Subject,
  switchMap,
  takeUntil, tap
} from 'rxjs';

import { DragAndDropDirective } from '@directives/drag-and-drop.directive';
import { ProductCategory } from '@entities/productCategory';
import { ProductCategoriesService } from '@services/productCategories.service';
import { StorageService } from '@services/firebase/storage.service';
import { ProductsService } from '@services/products.service';
import { productPriceValidator } from '@validators/productPrice.validator';
import { MaterialModule } from '@modules/material/material.module';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    DragAndDropDirective,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly storageService = inject(StorageService);

  readonly productCategories$: Observable<ProductCategory[]> = this.productsCategoriesService.getProductsCategories();

  @ViewChild('fileInput')
  readonly fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileImg')
  readonly fileImg!: ElementRef<HTMLImageElement>;
  @ViewChild('nameInput', { static: true })
  readonly nameInput!: ElementRef<HTMLInputElement>;

  productForm!: FormGroup;

  get productFormImg(): AbstractControl {
    return this.productForm.get('image') as FormControl;
  }

  get productFormCategory() {
    return this.productForm.get('category') as FormControl;
  }

  get productFormName() {
    return this.productForm.get('name') as FormControl;
  }

  get productFormPrice() {
    return this.productForm.get('price') as FormControl;
  }

  ngOnInit(): void {
    this.initProductForm();
    this.onSelectProductCategory();
    this.onChangeProductName();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectProductCategory() {
    this.productFormCategory
      .valueChanges
      .pipe(
        tap(() => {
          if (this.productFormName.enabled) return;
          this.productFormName.enable();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onEmitFileSelection() {
    this.fileInput.nativeElement.click();
  }

  removeSelectedFile() {
    this.productForm.patchValue({ image: null });
  }

  onChangeProductName() {
    combineLatest([
      this.productFormName.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(Boolean),
        takeUntil(this.destroy$)
      ),
      this.productFormCategory.valueChanges.pipe(
        switchMap((productCategory) => this.productsService.getProducts(productCategory).pipe(
          catchError(() => EMPTY)
        )),
        takeUntil(this.destroy$)
      )
    ]).pipe(
      switchMap(([productName, products]) => from(products).pipe(
        filter((product) => product.name === productName),
        tap(() => this.productFormName.setErrors({occupied: true})),
      )),
    ).subscribe();
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
      name: new FormControl({value: null, disabled: true}, Validators.required),
      price: new FormControl( null, [Validators.required, productPriceValidator]),
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
    const uploadMetadata = {
      contentType: 'image/jpeg'
    }
    this.storageService.uploadDocFile(productImg, uploadMetadata).pipe(
      switchMap(() => this.productsService.addProduct(category, product))
    ).subscribe({
      complete: () => {
        console.log('done');
      }
    });
  }
}
