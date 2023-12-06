import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { Order } from '@entities/order';
import { AuthService } from '@services/firebase/auth.service';
import { OrdersService } from '@services/orders.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly ordersServive = inject(OrdersService);

  private readonly subject = new Subject<void>();
  readonly user$ = this.authService.user$;
  userOrders$!: Observable<Order[]>;

  ngOnInit(): void {
    this.userOrders$ = this.authService.user$.pipe(
      takeUntil(this.subject),
      switchMap(user => this.ordersServive.getUserOrders(user!.uid)),
    );
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
