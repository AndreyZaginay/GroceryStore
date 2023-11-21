import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  readonly productsCategory: string[] = ['dairy', 'meat', 'bakery', 'grocery', 'sweets', 'fish', 'alcohol', 'drinks', 'household chemicals'];

}
