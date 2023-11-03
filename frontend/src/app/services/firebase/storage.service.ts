import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage = inject(Storage);
  
  constructor() { }

  getProductImg(productName: string) {
    return from(getDownloadURL(ref(this.storage, productName + '.jpg')));
  }
}
