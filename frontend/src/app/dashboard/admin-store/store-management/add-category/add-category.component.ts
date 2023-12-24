import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { ProductCategoriesService } from '@services/productCategories.service';
import { switchMap } from 'rxjs';

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
export class AddCategoryComponent implements OnInit {
  private readonly productsCategoriesService = inject(ProductCategoriesService);
  private readonly router = inject(Router);

  categoryForm!: FormGroup;

  ngOnInit(): void {
    this.initCategoryForm();
  }

  addCategory() {
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

  initCategoryForm() {
    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required)
    })
  }
}
