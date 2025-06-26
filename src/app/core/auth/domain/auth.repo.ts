import { Observable } from 'rxjs';
export abstract class AuthRepo {
  abstract login(data: object): Observable<any>;
  abstract register(data: object): Observable<any>;
  abstract forgetPassword(data: object): Observable<any>;
  abstract resetPassword(data: Object): Observable<any>;
  abstract verifyCode(data: object): Observable<any>;
  abstract deleteAcc(): Observable<any>;
  abstract getLoggedUserData(): Observable<any>;
  abstract editProfile(data: object): Observable<any>;
  abstract logout(): Observable<any>;
  abstract changePassword(data: object): Observable<any>;
}
