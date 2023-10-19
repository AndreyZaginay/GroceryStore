import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { ProductCardComponent } from './product-card/product-card.component';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor (private readonly route: ActivatedRoute,
              private readonly firebaseService: FirebaseService
    ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(p => this.firebaseService.getProducts(p['category']))).subscribe(console.log)
    // this.route.params.subscribe(p => console.log(p['category']))
  }

}
