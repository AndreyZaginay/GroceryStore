import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  readonly productsCategory: string[] = ['dairy', 'meat', 'bakery', 'grocery', 'sweets', 'fish', 'alcohol', 'drinks', 'household chemicals'];
}
