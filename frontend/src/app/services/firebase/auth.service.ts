import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user, signOut, User } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth: Auth = inject(Auth);
  readonly user$: Observable<User | null> = user(this.auth);
  
  signUp(credentials: any) {
    return from(createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map((userCredential) => userCredential.user),
    )
  }

  signIn(credentials: any) {
    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map((userCredential) => userCredential.user),
    )
  }

  signOut() {
    signOut(this.auth);
  }
}