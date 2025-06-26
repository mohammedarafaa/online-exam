import { Inject, inject, Injectable } from '@angular/core';
import { AuthadapterService } from '../adapter/auth.apiadapter';
import { AuthRepo } from './auth.repo';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthusecaseService {
  private readonly _adapter = inject(AuthadapterService);
  constructor(@Inject(AuthRepo) private _authRepo: AuthRepo) {}

  excuteLogin(data: object): Observable<any> {
    return this._authRepo.login(data).pipe(
      map((res) => this._adapter.adapt(res)),
      catchError((err) => of(err))
    );
  }
  excuteRegister(data: object): Observable<any> {
    return this._authRepo.register(data)
  }
  excuterForgetPassword(data: object): Observable<any> {
    return this._authRepo.forgetPassword(data);
  }
  excuteVerifyCode(data: object): Observable<any> {
    return this._authRepo.verifyCode(data);
  }
  excuteResetPassword(data: object): Observable<any> {
    return this._authRepo.resetPassword(data);
  }
}
