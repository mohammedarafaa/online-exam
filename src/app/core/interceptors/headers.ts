import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const HeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let Token: string | null = null;
  if (isPlatformBrowser(platformId)) {
    Token = localStorage.getItem('token');
  }
  if (Token) {
    req = req.clone({
      setHeaders: {
        token: Token,
      },
    });
  }
  return next(req);
};
