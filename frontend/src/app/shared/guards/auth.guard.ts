import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '@services/firebase/auth.service';


export const authGuard: CanActivateFn = () => {
  return inject(AuthService).user$.pipe(map(Boolean));
};

export const isAdminGuard: CanActivateFn = () => {
  return inject(AuthService).isAdmin();
};