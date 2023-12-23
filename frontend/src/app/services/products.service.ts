import { Injectable } from '@angular/core';
import { concatAll, filter, toArray } from 'rxjs';

import { AddProduct, Product, UpdateProduct} from "@entities/product";
import { BaseFirestoreService } from "./firebase/firestore.service";

@Injectable()
export class ProductsService extends BaseFirestoreService<Product> {

  getProducts(category: string) {
    return this.getDocs(`store/${category}/products`).pipe(
      concatAll(),
      filter((product: Product) => product.name !== 'required element'),
      toArray()
    );
  }

  getProduct(category: string, id: string) {
    return this.getDoc(`store/${category}/products/${id}`);
  }

  addProduct(category: string, data: AddProduct) {
    return this.addDoc(`store/${category}/products`, data);
  }

  updateProduct(category: string, id: string, data: UpdateProduct) {
    return this.updateDoc(`store/${category}/products/${id}`, data);
  }

  deleteProduct(category: string, id: string) {
    return this.deleteDoc(`store/${category}/products/${id}`);
  }
}
