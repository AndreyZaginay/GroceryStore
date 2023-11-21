import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  readonly user$ = user(this.auth);
  
  signUp(credentials: any) {
    from(createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map((userCredential) => userCredential.user)
    )
  }

  signIn(credentials: any) {
    from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map((userCredential) => userCredential.user)
    )
  }
}
