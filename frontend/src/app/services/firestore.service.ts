import { inject } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import {concatAll, from, map, Observable, toArray} from "rxjs";

export type QueryFilterConstraint = ReturnType<typeof where>;

export abstract class AbstractFirebaseService<T> {
  private readonly firestore = inject(Firestore);

  protected getDocs(path: string, constraints?: QueryFilterConstraint): Observable<T[]>;
  protected getDocs(path: string, constraints: QueryFilterConstraint): Observable<T[]> {
    const colRef = collection(this.firestore, path);
    let docsQuery = query(colRef, constraints);
    return from(getDocs(docsQuery)).pipe(
      map((querySnapshot) => querySnapshot.docs),
      concatAll(),
      map((doc) => ({id: doc.id, ...doc.data()}) as T),
      toArray()
    );
  }
}
