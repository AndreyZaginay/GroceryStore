import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Purchase } from 'src/app/entities/purchase';
import { Product } from 'src/app/entities/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public purchasesSubject = new Subject<Purchase[]>();

  purchases: Purchase[] = [];

  constructor() { }

  addPurchase(product: Product): void {
    const target = this.purchases.find((purchase) => purchase.product.name === product.name);
    if (!target) {
      this.purchases.push({ count: 1, product });
      this.updatePurchases(this.purchases);
      return;
    }
    target.count++;
    this.updatePurchases(this.purchases);
  }

  decreasePurchase(product: Product): void {
    const target = this.purchases.find((purchase) => purchase.product.name === product.name)!;
    target.count--;
    if (target.count === 0) {
      this.removePurchase(product);
      this.updatePurchases(this.purchases);
    }
  }

  removePurchase(product: Product): void {
    this.purchases = this.purchases.filter((purchase) => purchase.product.name !== product.name);
    this.updatePurchases(this.purchases);
  }

  updatePurchases(purchases: Purchase[]): void {
    this.purchasesSubject.next(purchases);
  }
}
