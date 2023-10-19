import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore)
  constructor() { }

  getProducts(Category: string): any {
    return collectionData(collection(this.firestore, Category));
  }
}
