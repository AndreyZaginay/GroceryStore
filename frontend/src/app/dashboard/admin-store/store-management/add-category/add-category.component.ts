import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Subject,
  combineLatest,
  from,
  switchMap,
  takeUntil,
  filter,
  tap,
  catchError, EMPTY
} from 'rxjs';

import { ProductCategoriesService } from '@services/productCategories.service';
import { MaterialModule } from '@modules/material/material.module';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
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
      this.formCategory.valueChanges.pipe(takeUntil(this.destroy$)),
      this.productsCategoriesService.getProductsCategories().pipe(
        catchError(() => EMPTY)
      )
    ]).pipe(
      switchMap(([categoryName, categories]) => from(categories).pipe(
        filter(category => category.name === categoryName),
        tap(() => this.formCategory.setErrors({'occupied': true}))
      )),
    ).subscribe();
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
