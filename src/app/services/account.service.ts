import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { environment } from '../../environments/environment.development';
import { Login } from '../models/Login';
import { LoginResponse } from '../models/LoginResponse';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private logedUser = new ReplaySubject<LoginResponse | null>(1);
  user$ = this.logedUser.asObservable();
  constructor(private http:HttpClient) { }

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
  setUser(user: LoginResponse){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.logedUser.next(user);

    this.user$.subscribe({
      next: response => console.log(response)
    })
  }
}
