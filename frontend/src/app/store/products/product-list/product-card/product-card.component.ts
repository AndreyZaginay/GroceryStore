import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from 'src/app/store/basket/basket.service';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

@Input()
product!: Product;

constructor (private readonly basketService: BasketService) {}

  addProduct(product: Product): void {
    this.basketService.addPurchase(product);
  }
}
