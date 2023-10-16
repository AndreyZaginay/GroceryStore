import { Injectable } from '@angular/core';

import { Purchase } from 'src/app/entities/purchase';
import { Product } from 'src/app/entities/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public purchases: Purchase[] = [];

  constructor() { }

  addPurchase(product: Product): void {
    const target = this.purchases.find((purchase) => purchase.product.name === product.name);
    if (!target) {
      this.purchases.push({count: 1, product});
      return;
    }
    target.count++;
  }

  decreaseProduct(product: Product): void {
    const target = this.purchases.find((purchase) => purchase.product.name === product.name)!;
    target.count--;
    if (target.count === 0) {
      this.removeProduct(product);
    }
  }

  removeProduct(product: Product): void {
    this.purchases = this.purchases.filter((purchase) => purchase.product.name !== product.name);
  }
}
