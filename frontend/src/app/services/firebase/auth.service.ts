import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  constructor() { }

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
