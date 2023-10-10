import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports:[CommonModule, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  readonly productsCategory: string[] = ['Dairy', 'Meat', 'Bakery', 'Grocery', 'Sweets', 'Fish', 'Alcohol', 'Drinks', 'Household chemicals'];
}
