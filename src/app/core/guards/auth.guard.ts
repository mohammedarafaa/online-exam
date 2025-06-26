import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../services/platform';

export const authGuard: CanActivateFn = (route, state) => {
  const platformService = inject(PlatformService);
  const router = inject(Router);
  if (platformService.checkPlatform()) {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};
