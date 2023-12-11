import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage = inject(Storage);
  
  getProductImg(productName: string) {
    return from(getDownloadURL(ref(this.storage, productName + '.jpg')));
  }

  uploadProductImg(file: File) {
    const metadata = {
      contentType: 'image/jpeg'
    }
    const storageRef = ref(this.storage, file.name);
    return from(uploadBytes(storageRef, file, metadata));
  }
}
