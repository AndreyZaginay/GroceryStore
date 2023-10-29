import { Component, Input, OnInit } from '@angular/core';

import { BasketService } from 'src/app/store/basket/basket.service';
import { Product } from 'src/app/entities/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

@Input()
product!: Product;

imgUrl$: any;

constructor (private readonly basketService: BasketService,private readonly productService: ProductsService) {}

  ngOnInit(): void {
   this.imgUrl$ = this.productService.getImg();
  }

  addProduct(product: Product): void {
    this.basketService.addPurchase(product);
  }

}
