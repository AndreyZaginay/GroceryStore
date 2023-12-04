import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';

import { Product } from '@entities/product';
import { Purchase } from '@entities/purchase';
import { BasketService } from './basket.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  animations: [
    trigger('basket', [
      state('open', style({
        transform: 'translateX(0)',
      })),
      state('close', style({
        transform: 'translateX(100%)',
      })),
      transition('close => open', [
        animate('.5s')
      ]),
      transition('open => close', [
        animate('.5s')
      ])
    ])
  ]
})
export class BasketComponent {
  
  purchases$: Subject<Purchase[]> = this.basketService.purchasesSubject;
  isOpen = false;

  constructor(private readonly basketService: BasketService, private readonly dialog: MatDialog) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  addPurchase(product: Product) {
    this.basketService.addPurchase(product);
  }

  decreasePurchase(product: Product) {
    this.basketService.decreasePurchase(product);
  }

  sumUp() {
    this.basketService.sumUp();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log('The dialog was closed');
    });
  }
}
