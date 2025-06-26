import { AuthEndPoints } from '../end_points/auth.endpoints';
import { inject, Inject, Injectable } from '@angular/core';
import { AuthRepo } from '../domain/auth.repo';
import { Observable } from 'rxjs';
import { ApiBaseUrl } from '../../utility/base.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthdatalayerService implements AuthRepo {
  private readonly http: HttpClient = inject(HttpClient);
  constructor(@Inject(ApiBaseUrl) private readonly apiBaseUrl: string) {}
  login(data: object): Observable<any> {
    return this.http.post(this.apiBaseUrl + AuthEndPoints.Login, data);
  }
  register(data: object): Observable<any> {
    return this.http.post(this.apiBaseUrl + AuthEndPoints.Register, data);
  }
  forgetPassword(data: object): Observable<any> {
    return this.http.post(this.apiBaseUrl + AuthEndPoints.ForgetPassword, data);
  }
  resetPassword(data: Object): Observable<any> {
    return this.http.put(this.apiBaseUrl + AuthEndPoints.ResetPassword, data);
  }
  verifyCode(data: object): Observable<any> {
    return this.http.post(this.apiBaseUrl + AuthEndPoints.VerifyCode, data);
  }
  editProfile(data: object): Observable<any> {
    return this.http.put(this.apiBaseUrl + AuthEndPoints.EditProfile, data);
  }
  getLoggedUserData(): Observable<any> {
    return this.http.get(this.apiBaseUrl + AuthEndPoints.GetLoggedUserData);
  }
  changePassword(data: object): Observable<any> {
    return this.http.patch(
      this.apiBaseUrl + AuthEndPoints.ChangePassword,
      data
    );
  }
  deleteAcc(): Observable<any> {
    return this.http.delete(this.apiBaseUrl + AuthEndPoints.DeleteAcc);
  }
  logout(): Observable<any> {
    return this.http.get(this.apiBaseUrl + AuthEndPoints.Logout);
  }
}
