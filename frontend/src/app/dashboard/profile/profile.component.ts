import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly usersServive = inject(UsersService);

  private readonly subject = new Subject<void>();

  userData$: Observable<User> = this.authService.user$.pipe(
    switchMap(user => this.usersServive.getUserById(user!.uid))
  )

  ngOnInit(): void {
    this.userData$.pipe(
      takeUntil(this.subject)
    ).subscribe(console.log)
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
