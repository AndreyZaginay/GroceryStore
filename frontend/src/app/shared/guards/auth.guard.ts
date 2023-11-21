import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from 'src/app/services/firebase/auth.service';

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).user$.pipe(map(Boolean));
};