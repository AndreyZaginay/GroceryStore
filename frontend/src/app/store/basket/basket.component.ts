import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BasketService } from './basket.service';
import { Product } from 'src/app/entities/product';
import { Purchase } from 'src/app/entities/purchase';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
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
  purchases: Purchase[] = this.basketService.purchases
  constructor (private readonly basketService: BasketService) {}

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
