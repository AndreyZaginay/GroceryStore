import { Injectable } from '@angular/core';

import { AddProductCategory, ProductCategory } from "@entities/productCategory";
import { BaseFirestoreService } from "./firebase/firestore.service";

@Injectable()
export class ProductCategoriesService extends BaseFirestoreService<ProductCategory> {

  getProductsCategories() {
    return this.getDocs('productCategories');
  }

  addProductCategory(newCategory: AddProductCategory) {
    return this.addDoc('productCategory', newCategory);
  }

}
