import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from '../../basket/basket.service';
import { StorageService } from '@services/firebase/storage.service';
import { Product } from '@entities/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
@Input()
product!: Product;

imgUrl$!: Observable<string>;

constructor (private readonly basketService: BasketService, private readonly storageService: StorageService) {}

  ngOnInit(): void {
   this.imgUrl$ = this.storageService.getFileDoc(`${this.product.name}.jpg`);
  }

  addProduct(product: Product): void {
    this.basketService.addPurchase(product);
  }
}
