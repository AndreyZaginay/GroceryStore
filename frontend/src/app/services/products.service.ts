import { Injectable } from '@angular/core';

import { AddProduct, Product, UpdateProduct} from "../entities/product";
import { BaseFirestoreService } from "./firebase/firestore.service";

@Injectable()
export class ProductsService extends BaseFirestoreService<Product> {

  getProducts(category: string) {
    return this.getDocs(category);
  }

  getProduct(categoryWithId: string) {
    return this.getDoc(categoryWithId);
  }

  addProduct(category: string, data: AddProduct) {
    return this.addDoc(category, data);
  }

  updateProduct(categoryWithId: string, data: UpdateProduct) {
    return this.updateDoc(categoryWithId, data);
  }

  deleteProduct(categoryWithId: string) {
    return this.deleteDoc(categoryWithId);
  }
}
