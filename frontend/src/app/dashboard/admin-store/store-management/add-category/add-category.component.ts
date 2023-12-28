import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subject, combineLatest, concatMap, find, from, fromEvent, map, switchMap, takeUntil } from 'rxjs';

import { ProductCategoriesService } from '@services/productCategories.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly router = inject(Router);

  private readonly destroy$ = new Subject<void>;  
  categoryForm!: FormGroup;

  get formCategory(): AbstractControl {
    return this.categoryForm.get('category') as FormControl;
  }

  @ViewChild('input', { static: true })
  readonly categoryInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.initCategoryForm();
    this.onCategoryInput();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategoryInput() {
    combineLatest([
      fromEvent(this.categoryInput.nativeElement, 'input').pipe(
        map(e => (e.target as HTMLInputElement).value),
        takeUntil(this.destroy$)
      ),
      this.productsCategoriesService.getProductsCategories()
    ]).pipe(
      concatMap(([categoryName, categories]) => from(categories).pipe(
        find(category => category.name === categoryName),
        map(Boolean)
      ))
    ).subscribe((isError) => {
      if (isError) {
        this.formCategory.setErrors({'alreadyExists': isError});
        return;
      }      
    })
  }

  addCategory(): void {
    if (this.categoryForm.invalid) {  
      return;
    }
    const { category } = this.categoryForm.getRawValue();
    this.productsCategoriesService.addCategoryCollection(category).pipe(
      switchMap(() => {
        return this.productsCategoriesService.addProductCategory({ name: category });
      })
    ).subscribe({
      error: (e) => console.log(e.message),
      complete: () => this.router.navigate(['dashboard/admin-store/store-management/add-product'])
    })
  }

  initCategoryForm(): void {
    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required)
    })
  }
}
