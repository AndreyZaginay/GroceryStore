import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }
}
