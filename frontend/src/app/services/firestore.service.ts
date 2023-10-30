import { inject } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { concatAll, from, map, Observable, of, toArray } from "rxjs";
import { Storage, StorageReference, getDownloadURL, ref } from '@angular/fire/storage';

export interface FirestoreDocument {
  id: string;
}

export type AddFirestoreDocument<T extends FirestoreDocument> = Omit<T, 'id'>;
export type UpdateFirestoreDocument<T extends FirestoreDocument> = Partial<AddFirestoreDocument<T>>;
export type QueryFilterConstraint = ReturnType<typeof where>;

export abstract class BaseFirestoreService<T extends FirestoreDocument> {
  private readonly firestore = inject(Firestore);
  private storage: Storage = inject(Storage);

  protected getDocs(path: string, constraints?: QueryFilterConstraint): Observable<T[]>;  
  protected getDocs(path: string, constraints: QueryFilterConstraint): Observable<T[]> {
    const colRef = collection(this.firestore, path);
    let getDocs$ = from(getDocs(colRef));
    if (constraints) {
      const docsQuery = query(colRef, constraints);
      getDocs$ = from(getDocs(docsQuery));
    }
    return getDocs$.pipe(
      map((querySnapshot) => querySnapshot.docs),
      concatAll(),  
      map((docSnap) => ({id: docSnap.id, ...docSnap.data()}) as T),
      toArray()
    );
  }

  protected getProductImg(productName: string) {
    return from(getDownloadURL(ref(this.storage, productName + '.jpg')));
  }

  protected getDoc(path: string) {
    const docRef = doc(this.firestore, path);
    return from(getDoc(docRef)).pipe(
      map((docSnap) => ({id: docSnap.id, ...docSnap.data()}) as T)
    )
  }

  protected addDoc(path: string, data: AddFirestoreDocument<T>) {
    const colRef = collection(this.firestore, path);
    return from(addDoc(colRef, data)).pipe(
      map((docRef) => docRef.id)
    );
  }

  protected updateDoc(path: string, data: UpdateFirestoreDocument<T>) {
    const docRef = doc(this.firestore, path);
    return from(updateDoc(docRef, data));
  }

  protected deleteDoc(path: string) {
    const docRef = doc(this.firestore, path);
    return from(deleteDoc(docRef));
  }
}
