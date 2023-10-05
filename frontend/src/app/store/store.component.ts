import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

}
