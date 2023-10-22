import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../../services/products.service';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {}

  ngOnInit(): void {
   this.products$ = this.route.params.pipe(switchMap((params) => this.productsService.getProducts(params['category'])));
  }
}
