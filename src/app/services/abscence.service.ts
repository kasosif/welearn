import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AbscenceService {
  url = 'http://localhost/laravel/gestion-scolarite/public/api/abscences';
  constructor(private httpClient: HttpClient,
              private router: Router) { }
  getAbscences() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
