import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../services/platform';

export const loggedGuard: CanActivateFn = (route, state) => {
  const platformService = inject(PlatformService);
  const router = inject(Router);
  if (platformService.checkPlatform()) {
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/dashboard']);
      return false;
    }
  }
  return true;
};
