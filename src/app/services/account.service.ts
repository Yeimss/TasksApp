import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { environment } from '../../environments/environment.development';
import { Login, RefreshToken } from '../models/Login';
import { LogedUser, LoginResponse } from '../models/LoginResponse';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private logedUser = new ReplaySubject<LogedUser | null>(1);

  user$ = this.logedUser.asObservable();
  constructor(private http:HttpClient, private router:Router) { }

  refreshUser(refreshToken:RefreshToken){
    return this.http.post<LoginResponse>(`${environment.appUrl}/identity/register`, refreshToken).pipe(
      map((user: LoginResponse) => {
        if(user){
          let usuarioLogueado : LogedUser = {
            tokenInfo: user,
            emailUser: this.getEmail(),
          } 
          this.setUserRefresh(usuarioLogueado);
          return user;
        }
        return null;
      })
    );
  }

  register(model: Register){
    return this.http.post(`${environment.appUrl}/identity/register`, model);
  }

  login(model: Login){
    return this.http.post<LoginResponse>(`${environment.appUrl}/identity/login`, model).pipe(
      map((user: LoginResponse) => {
        let usuarioLogueado : LogedUser = {
          tokenInfo: user,
          emailUser: model.email,
        } 
        if(user){
          this.setUser(usuarioLogueado);
          return user;
        }
        return null;
      })
    );
  }

  setUser(user: LogedUser){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.logedUser.next(user);
    this.user$.subscribe({
      next: response => {  }
    })
  }
  setUserRefresh(user: LogedUser){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.logedUser.next(user);
    this.user$.subscribe({
      next: response => {  }
    })
  }
  logout(){
    localStorage.removeItem(environment.userKey);
    this.logedUser.next(null);
    this.router .navigateByUrl('/');
  }

  getToken(){
    const key = localStorage.getItem(environment.userKey)
    if(key){
      const user:LogedUser = JSON.parse(key);
      return user.tokenInfo.accessToken;
    }else{
      return null
    }
  }
  getRefreshToken(){
    const key = localStorage.getItem(environment.userKey)
    if(key){
      const user:LogedUser = JSON.parse(key);
      return user.tokenInfo.refreshToken;
    }else{
      return null
    }
  }
  getEmail(){
    const key = localStorage.getItem(environment.userKey)
    if(key){
      const user:LogedUser = JSON.parse(key);
      return user.emailUser;
    }else{
      return ''
    }
  }

  
}
