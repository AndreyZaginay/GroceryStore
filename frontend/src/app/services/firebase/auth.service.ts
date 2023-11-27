import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user, signOut } from '@angular/fire/auth';
import { combineLatest, from, map } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly usersService = inject(UsersService);
  
  readonly user$ = user(this.auth);
  
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

  isAdmin() {
    return combineLatest([this.user$, this.usersService.getAdmin()]).pipe(
      map(([user, admin]) => {
        if (!user) return false;
        return user.uid === admin.id;
      }),
    )
  }

  signOut() {
    signOut(this.auth);
  }
}