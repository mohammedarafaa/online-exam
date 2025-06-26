import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr: ToastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      toastr.error(err?.error?.message || err.message || 'Unknown error');
      return throwError(() => err);
    })
  );
};
