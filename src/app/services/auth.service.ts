import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost/laravel/gestion-scolarite/public/api/auth';
  signinUser(email: string, password: string) {
    return this.httpClient.post(this.url + '/login', {email, password});
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public getdateLogin(): Date {
    return new Date(parseInt(localStorage.getItem('date-login'), 10));
  }
}
