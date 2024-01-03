import { Injectable, inject } from '@angular/core';
import { SettableMetadata, Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage = inject(Storage);
  
  getFileDoc(docUrl: string) {
    const docRef = ref(this.storage, docUrl)
    return from(getDownloadURL(docRef));
  }

  uploadDocFile(file: File, metadata?: SettableMetadata) {
    const storageRef = ref(this.storage, file.name);
    return from(uploadBytes(storageRef, file, metadata));
  }

  deleteDocFile(fileName: string) {
    const deleteRef = ref(this.storage, fileName);
    return deleteObject(deleteRef);
  }
}
