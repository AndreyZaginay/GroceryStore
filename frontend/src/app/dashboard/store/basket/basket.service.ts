import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Purchase } from '@entities/purchase';
import { Product } from '@entities/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public purchasesSubject = new Subject<Purchase[]>();

  purchases: Purchase[] = [];

  constructor() { }

  addPurchase(product: Product): void {
    product.measurement === 'kg' ? this.addPurchaseByMeasurement(0.1, product) : this.addPurchaseByMeasurement(1, product);
  }

  addPurchaseByMeasurement(value: number, product: Product) {
    const target = this.purchases.find((purchase) => purchase.product.name === product.name);
    if (!target) {
      this.purchases.push({ count: value, product });
      this.emitPurchases(this.purchases);
      return;
    }
    target.count = +(target.count + value).toFixed(1);
    this.emitPurchases(this.purchases);
  }

  decreasePurchase(product: Product): void {
    product.measurement === 'kg' ? this.decreasePurchaseByMeasurement(0.1, product) : this.decreasePurchaseByMeasurement(1, product);
  }

  decreasePurchaseByMeasurement(value: number, product: Product) {
    const target = this.purchases.find((purchase) => purchase.product.name === product.name)!;
    target.count = +(target.count - value).toFixed(1);
    if (target.count === 0) {
      this.removePurchase(product);
      this.emitPurchases(this.purchases);
    }
  }

  removePurchase(product: Product): void {
    this.purchases = this.purchases.filter((purchase) => purchase.product.name !== product.name);
    this.emitPurchases(this.purchases);
  }

  emitPurchases(purchases: Purchase[]): void {
    this.purchasesSubject.next(purchases);
  }

  sumUp(): number {
    return this.purchases.reduce((acc, { count, product }) => acc + Number(count) * Number(product.price), 0);
  }
}
