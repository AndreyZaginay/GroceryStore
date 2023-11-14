import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  constructor() { }

  signUp(email: string, password: string) {
    from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential) => userCredential.user)
    )
  }

  signIn(email: string, password: string) {
    from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential) => userCredential.user)
    )
  }

}
