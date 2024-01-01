import { Injectable } from '@angular/core';

import { AddProductCategory, ProductCategory } from "@entities/productCategory";
import { BaseFirestoreService } from "./firebase/firestore.service";

@Injectable()
export class ProductCategoriesService extends BaseFirestoreService<ProductCategory> {

  getProductsCategories() {
    return this.getDocs('productCategories');
  }

  addCategoryCollection(category: string) {
    const requiredElement = { name: 'required element' };
    return this.addDoc(`store/${category}/products`, requiredElement);
  }

  addProductCategory(newCategory: AddProductCategory) {
    return this.addDoc('productCategories', newCategory);
  }

}
