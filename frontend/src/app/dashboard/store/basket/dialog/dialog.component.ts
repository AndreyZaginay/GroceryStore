import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';

import { BasketService } from '../basket.service';
import { Purchase } from '@entities/purchase';
import { AuthService } from '@services/firebase/auth.service';
import { AddOrder } from '@entities/order';
import { OrdersService } from '@services/orders.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit , OnDestroy{
  private readonly basketService = inject(BasketService);
  private readonly ordersService = inject(OrdersService);
  private readonly authService = inject(AuthService);
  private readonly subject = new Subject<void>();
  
  public orderPrice!: number;
  public purchases: Purchase[] = this.basketService.purchases;

  constructor(public dialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.orderPrice = this.basketService.sumUp();
  }

  buy(): void {
    this.authService.user$.pipe(
      switchMap(user => {
        if (!user) {
         this.closeDialog();
         return EMPTY;
        }
        const ordereProducts = this.purchases.map(({count, product}) => ({productId: product.id, count: count }));
        const newOrder: AddOrder = { 
          products: ordereProducts, 
          totalPrice: this.orderPrice, 
          date: new Date().toISOString(), 
          userId: user.uid 
        };
        return this.ordersService.addOrder(newOrder)
      }),
      takeUntil(this.subject)
    ).subscribe(() => this.closeDialog());
  }
  
  closeDialog(): void {
    this.basketService.purchases = [];
    this.basketService.emitPurchases([]);
    this.dialogRef.close(); 
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
