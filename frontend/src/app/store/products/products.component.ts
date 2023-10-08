import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  readonly productsCategory: string[] = ['Dairy', 'Meat', 'Grocery', 'Sweets', 'Meat & fish', 'Alcohol', 'Household chemicals'];
}
