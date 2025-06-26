import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class
AuthadapterService {
  adapt(data:any):any{
    return {
      message:data.message,
      token:data.token,
      userName:data.user.username
    }
  }
}
