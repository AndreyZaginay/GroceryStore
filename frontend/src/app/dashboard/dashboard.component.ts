import { Component, inject } from '@angular/core';

import { AuthService } from '@services/firebase/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  readonly user$ = inject(AuthService).user$;
  readonly isUserAdmin$ = inject(AuthService).isAdmin();
}
