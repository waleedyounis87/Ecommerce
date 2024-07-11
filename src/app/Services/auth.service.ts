import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem('token')?true:false);
  constructor(private _HttpClient:HttpClient, private _Router:Router) { }
 
  register(form:object):Observable<any>{
    console.log(form)
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', form)
  }
  login(loginForm:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginForm)
  }
  logout(){
    localStorage.removeItem('token')
    this._Router.navigate(['/login']);
    this.isLoggedIn.next(false);
  }
  forgetpassowrd(form:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', form)
  }
  verifyCode(form:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', form)
  }
  resetPassword(form:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', form)
  }
}
