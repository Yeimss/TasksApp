import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { environment } from '../../environments/environment.development';
import { Login, RefreshToken } from '../models/Login';
import { LoginResponse } from '../models/LoginResponse';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private logedUser = new ReplaySubject<LoginResponse | null>(1);
  user$ = this.logedUser.asObservable();
  constructor(private http:HttpClient, private router:Router) { }

  refreshUser(refreshToken:RefreshToken){
    return this.http.post<LoginResponse>(`${environment.appUrl}/identity/register`, refreshToken).pipe(
      map((user: LoginResponse) => {
        if(user){
          this.setUser(user);
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
        if(user){
          this.setUser(user);
          return user;
        }
        return null;
      })
    );
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.logedUser.next(null);
    this.router .navigateByUrl('/');
  }

  getToken(){
    const key = localStorage.getItem(environment.userKey)
    if(key){
      const user:LoginResponse = JSON.parse(key);
      return user.accessToken;
    }else{
      return null
    }
  }
  getRefreshToken(){
    const key = localStorage.getItem(environment.userKey)
    if(key){
      const user:LoginResponse = JSON.parse(key);
      return user.refreshToken;
    }else{
      return null
    }
  }

  setUser(user: LoginResponse){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.logedUser.next(user);

    this.user$.subscribe({
      next: response => {  }
    })
  }
}
