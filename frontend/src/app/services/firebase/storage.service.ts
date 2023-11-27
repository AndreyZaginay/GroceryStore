import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage = inject(Storage);
  
  getProductImg(productName: string) {
    return from(getDownloadURL(ref(this.storage, productName + '.jpg')));
  }
}
